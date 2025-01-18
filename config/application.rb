require_relative "boot"

require "rails/all"

Bundler.require(*Rails.groups)

module Playground
  class Application < Rails::Application
    config.load_defaults Float("#{Rails::VERSION::MAJOR}.#{Rails::VERSION::MINOR}")

    config.autoload_lib(ignore: %w[assets tasks])

    config.generators do |g|
      g.helper false
      g.stylesheets false
      g.javascripts false
      g.test_framework :rspec, fixture: true, views: false
      g.fixture_replacement :factory_bot, dir: "spec/factories"
    end
  end
end
