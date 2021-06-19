FROM ruby:3.0.1-alpine
RUN apk --update add --no-cache imagemagick postgresql-client postgresql-dev build-base yarn tzdata
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn
COPY . /app
