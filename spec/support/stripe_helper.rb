module StripeHelper
  def fill_in_stripe(data)
    page.evaluate_script(<<~JS)
      window.STRIPE_FAKE_TOKEN_RESPONSE = #{JSON.generate(data)};
    JS
  end
end

RSpec.configure do |config|
  config.include StripeHelper, type: :system
end
