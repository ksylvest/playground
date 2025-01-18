FactoryBot.define do
  factory :billing_source, class: "Billing::Source" do
    sequence(:stripe_id) { |id| "fake_#{id}" }
    customer factory: :billing_customer
    brand { "Visa" }
    funding { "credit" }
    number { "4242" }
    exp_month { 12 }
    exp_year { 3000 }
  end
end
