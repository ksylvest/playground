FactoryBot.define do
  factory :billing_product, class: 'Billing::Product' do
    sequence(:stripe_id) { |id| "fake_#{id}" }
    name { 'Student' }
  end
end
