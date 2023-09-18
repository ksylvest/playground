# syntax = docker/dockerfile:1

ARG RUBY_VERSION="3.2.2"

FROM ruby:${RUBY_VERSION}-slim AS base
WORKDIR /rails

ENV BUNDLE_DEPLOYMENT="on" BUNDLE_WITHOUT="development:test"

FROM base AS build

RUN \
  apt-get update -qq && \
  apt-get install --no-install-recommends -y build-essential libpq-dev npm && \
  rm -rf /var/lib/apt/lists/* /var/cache/apt/archives

COPY Gemfile .
COPY Gemfile.lock .
RUN bundle install

COPY package.json .
COPY yarn.lock .
RUN npm install -g yarn && yarn install

COPY . .

RUN SECRET_KEY_BASE="SKIP" bundle exec rake assets:precompile

FROM base

RUN \
  apt-get update -qq && \
  apt-get install --no-install-recommends -y libpq-dev libvips && \
  rm -rf /var/lib/apt/lists/* /var/cache/apt/archives

COPY --from=build /rails/public/assets /rails/public/assets
COPY --from=build /rails/vendor/bundle /rails/vendor/bundle

COPY . .

RUN bundle exec bootsnap precompile --gemfile /app /lib

ENTRYPOINT ["/rails/bin/entrypoint"]

EXPOSE $PORT
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
