FactoryBot.define do
  factory :stripe_subscription, class: 'Stripe::Subscription' do
    initialize_with { Stripe::Subscription.new(id: id) }
    transient do
      sequence(:id) { |id| "subscription_#{id}" }
    end
  end
end
