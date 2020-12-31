require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module Playground
  class Application < Rails::Application
    config.load_defaults 6.1

    config.skylight.probes += %w[graphql redis]

    config.generators do |g|
      g.helper false
      g.stylesheets false
      g.javascripts false
      g.template_engine :slim
      g.test_framework :rspec, fixture: true, views: false
      g.fixture_replacement :factory_bot, dir: 'spec/factories'
    end
  end
end
