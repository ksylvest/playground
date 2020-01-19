require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)
require 'billing'

module Dummy
  class Application < Rails::Application
    config.load_defaults 6.0

    config.generators do |g|
      g.helper false
      g.stylesheets false
      g.javascripts false
      g.test_framework :rspec, fixture: true, views: false
      g.fixture_replacement :factory_bot, dir: 'spec/factories'
    end
  end
end
