FactoryBot.define do
  factory :billing_product, class: 'Billing::Product' do
    sequence(:stripe_id) { |id| "fake_#{id}" }
    sequence(:name) { |index| "Product ##{index}" }
  end
end
