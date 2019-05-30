require 'simplecov'
SimpleCov.start 'rails'

require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)

require 'rspec/rails'
require 'webmock/rspec'

WebMock.disable_net_connect!(allow_localhost: true, allow: 'chromedriver.storage.googleapis.com')

Dir[Rails.root.join('spec/support/**/*.rb')].each { |file| require file }

ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  config.before(type: :system) do
    driven_by :selenium, using: :headless_chrome, screen_size: [1280, 800]
  end

  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  config.use_transactional_fixtures = true

  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
end
