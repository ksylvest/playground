FactoryBot.define do
  factory :billing_customer, class: "Billing::Customer" do
    sequence(:stripe_id) { |id| "fake_#{id}" }
    user
  end
end
