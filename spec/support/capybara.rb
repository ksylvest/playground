RSpec.configure do |config|
  config.before(type: :system) do
    driven_by :selenium, using: :headless_chrome, screen_size: [1280, 800]
  end

  config.after(type: :system) do
    logs = page.driver.browser.logs.get(:browser)
    errors = logs.select { |log| log.level.in?(%w[SEVERE WARNING]) }
      .reject { |log| log.message.include?('You may test your Stripe.js integration over HTTP. However, live Stripe.js integrations must use HTTPS.') }
    expect(errors).to(be_blank, errors.map(&:message).join("\n"))
  end
end
