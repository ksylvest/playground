FactoryBot.define do
  factory :billing_subscription, class: 'Billing::Subscription' do
    sequence(:stripe_id) { |id| "fake_#{id}" }
    association :customer, factory: :billing_customer
    association :plan, factory: :billing_plan
  end
end
