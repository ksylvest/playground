module Billing
  class BuildStripeSetupIntentService
    def self.perform!(...)
      new(...).perform!
    end

    def initialize(user:)
      @user = user
    end

    def perform!
      Stripe::SetupIntent.create({
        customer: customer.stripe_id,
        payment_method_types: %w[card],
      })
    end

  private

    def customer
      @customer ||= BuildCustomerService.perform!(user: @user)
    end
  end
end
