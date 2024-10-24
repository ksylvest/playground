# syntax = docker/dockerfile:1

ARG RUBY_VERSION="3.3.5"

FROM ruby:${RUBY_VERSION}-slim AS base

ENV \
  BUNDLE_DEPLOYMENT="1" \
  BUNDLE_PATH="/usr/local/bundle" \
  BUNDLE_WITHOUT="development:test" \
  NODE_ENV="production" \
  RAILS_ENV="production" \
  RUBY_YJIT_ENABLE="1"

WORKDIR /rails

FROM base AS build

RUN \
  apt-get update -qq && \
  apt-get install --no-install-recommends -y build-essential libjemalloc2 libpq-dev npm curl unzip && \
  rm -rf /var/lib/apt/lists/* /var/cache/apt/archives

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN SECRET_KEY_BASE="SKIP" ./bin/rails assets:precompile

FROM base

RUN \
  apt-get update -qq && \
  apt-get install --no-install-recommends -y libjemalloc2 libpq-dev libvips && \
  rm -rf /var/lib/apt/lists/* /var/cache/apt/archives

COPY . .
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails/public/assets /rails/public/assets

RUN bundle exec bootsnap precompile --gemfile /app /lib

ENTRYPOINT ["/rails/bin/entrypoint"]

EXPOSE $PORT
CMD ["./bin/thrust", "./bin/rails", "server"]
