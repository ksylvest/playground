require "simplecov"
SimpleCov.start "rails"

require "spec_helper"
ENV["RAILS_ENV"] ||= "test"
require File.expand_path("../config/environment", __dir__)

require "rspec/rails"
require "webmock/rspec"

WebMock.disable_net_connect!(
  allow_localhost: true,
  allow: [
    "chromedriver.storage.googleapis.com",
    "googlechromelabs.github.io",
    /gvt.*\.com/,
  ]
)

Rails.root.glob("spec/support/**/*.rb").each { |file| require file }

ActiveRecord::Migration.maintain_test_schema!

ActiveJob::Base.queue_adapter = :test

RSpec.configure do |config|
  config.use_transactional_fixtures = true

  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
end
