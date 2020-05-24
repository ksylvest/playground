module Billing
  class BuildSubscriptionService
    def self.perform!(*args)
      new(*args).perform!
    end

    def initialize(user:, plan_id:)
      @user = user
      @plan = Billing::Plan.find(plan_id)
    end

    def perform!
      stripe = Stripe::Subscription.create(customer: customer.stripe_id, items: [{ plan: @plan.stripe_id }])
      subscription = customer.subscriptions.find_or_initialize_by(stripe_id: stripe.id)
      subscription.plan = @plan
      subscription.parse(stripe)
      subscription.save!
    end

  private

    def customer
      @customer ||= BuildCustomerService.perform!(user: @user)
    end
  end
end
