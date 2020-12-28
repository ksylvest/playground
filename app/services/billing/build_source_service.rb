module Billing
  class BuildSourceService
    def self.perform!(...)
      new(...).perform!
    end

    def initialize(user:, source:)
      @user = user
      @source = source
    end

    def perform!
      stripe = Stripe::Customer.create_source(customer.stripe_id, source: @source)
      source = customer.sources.find_or_initialize_by(stripe_id: stripe.id)
      source.parse(stripe)
      source.save!
      source
    end

  private

    def customer
      @customer ||= BuildCustomerService.perform!(user: @user)
    end
  end
end
