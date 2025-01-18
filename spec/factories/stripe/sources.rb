FactoryBot.define do
  factory :stripe_source, class: "Stripe::Source" do
    initialize_with { Stripe::Source.new(id:) }
    transient do
      sequence(:id) { |id| "source_#{id}" }
    end
    brand { "Visa" }
    funding { "credit" }
    last3 { "000" }
    last4 { "0000" }
    exp_month { 3000 }
    exp_year { 12 }
  end
end
