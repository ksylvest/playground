require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module Playground
  class Application < Rails::Application
    config.load_defaults 6.0

    config.server_renderer_timeout = 4 # seconds
    config.react.server_renderer_extensions = %w[jsx js tsx ts]
    config.react.server_renderer_directories = %w[/app/assets/webpack]
    config.react.server_renderer_options = { files: %w[application.js] }

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
