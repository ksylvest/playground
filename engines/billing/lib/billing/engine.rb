module Billing
  class Engine < ::Rails::Engine
    isolate_namespace Billing

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
