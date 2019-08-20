module StripeHelper
  def fill_in_source(number: '4242 4242 4242 4242', exp_date: '12/30', cvc: '000', zip: '00000')
    within_frame(:css, '.StripeElement iframe') do
      number.chars.each do |char|
        find_field('cardnumber').send_keys(char)
      end

      fill_in('exp-date', with: exp_date)
      fill_in('cvc', with: cvc)
      fill_in('ZIP', with: zip)
    end
  end
end

RSpec.configure do |config|
  config.include StripeHelper, type: :system
end
