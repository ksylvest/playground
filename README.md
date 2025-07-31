# Playground

## Configuration

```bash
bin/setup
```

If configuring with the ability to fetch config variables from Heroku environment run:

```
heroku config:get RAILS_MASTER_KEY > config/master.key
```

Otherwise follow the documentation for [credentials](https://guides.rubyonrails.org/security.html#custom-credentials) and generate entries for the options in `./config/credentials.yml.sample`.

## Usage

Changes to the GraphQL schema (`app/graphql`) require:

```
rake graphql:schema:generate
npm run codegen
```

## Status

[![CircleCI](https://circleci.com/gh/ksylvest/playground.svg?style=svg)](https://circleci.com/gh/ksylvest/playground)

## Copyright

Copyright (c) - All Rights Reserved
