FactoryBot.define do
  factory :stripe_product, class: "Stripe::Product" do
    initialize_with { Stripe::Product.new(id:) }
    transient do
      sequence(:id) { |id| "product_#{id}" }
    end
    name { "Student" }
  end
end
