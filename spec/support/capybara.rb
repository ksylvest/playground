require 'capybara-screenshot/rspec'

Capybara.register_driver :chrome do |app|
  capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(chromeOptions: { args: %w[headless] })
  Capybara::Selenium::Driver.new(app, browser: :chrome, desired_capabilities: capabilities)
end

Capybara::Screenshot.register_driver :chrome do |driver, path|
  driver.browser.save_screenshot(path)
end

Capybara.default_driver = :chrome
