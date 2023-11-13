# syntax = docker/dockerfile:1

ARG RUBY_VERSION="3.2.2"

FROM ruby:${RUBY_VERSION}-slim AS base

ENV \
  BUNDLE_DEPLOYMENT="on" \
  BUNDLE_PATH="/usr/local/bundle" \
  BUNDLE_WITHOUT="development:test" \
  RAILS_ENV="production" \
  PATH="/root/.bun/bin:$PATH"

WORKDIR /rails

FROM base AS build

RUN \
  apt-get update -qq && \
  apt-get install --no-install-recommends -y build-essential libpq-dev npm curl unzip && \
  curl -fsSL https://bun.sh/install | bash && \
  rm -rf /var/lib/apt/lists/* /var/cache/apt/archives

COPY Gemfile .
COPY Gemfile.lock .
COPY .ruby-version .
RUN bundle install

COPY package.json .
COPY bun.lockb .
RUN bun install

COPY . .

RUN SECRET_KEY_BASE="SKIP" ./bin/rails assets:precompile

FROM base

RUN \
  apt-get update -qq && \
  apt-get install --no-install-recommends -y libpq-dev libvips && \
  rm -rf /var/lib/apt/lists/* /var/cache/apt/archives

COPY . .
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails/public/assets /rails/public/assets

RUN bundle exec bootsnap precompile --gemfile /app /lib

RUN useradd rails -m -s /bin/bash && \
  chown -R rails:rails log storage tmp
USER rails:rails

ENTRYPOINT ["/rails/bin/entrypoint"]

EXPOSE $PORT
CMD ["./bin/rails", "server"]
