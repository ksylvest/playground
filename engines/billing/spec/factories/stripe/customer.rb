FactoryBot.define do
  factory :stripe_customer, class: 'Stripe::Customer' do
    initialize_with { Stripe::Customer.new(id: id) }
    transient do
      sequence(:id) { |id| "customer_#{id}" }
    end
  end
end
