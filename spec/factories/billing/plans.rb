FactoryBot.define do
  factory :billing_plan, class: 'Billing::Plan' do
    sequence(:stripe_id) { |id| "fake_#{id}" }
    association :product, factory: :billing_product
    amount { 800 }
    currency { 'cad' }
    interval { 'month' }
  end
end
