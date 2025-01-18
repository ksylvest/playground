FactoryBot.define do
  factory :stripe_plan, class: "Stripe::Plan" do
    initialize_with { Stripe::Plan.new(id:) }
    transient do
      sequence(:id) { |id| "product_#{id}" }
    end
    amount { 800 }
    currency { "cad" }
    interval { "month" }
  end
end
