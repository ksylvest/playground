module Billing
  class DestroySourceService
    def self.perform!(*args)
      new(*args).perform!
    end

    def initialize(user:, id:)
      @user = user
      @id = id
    end

    def perform!
      source = customer.sources.find(@id)
      Stripe::Customer.delete_source(customer.stripe_id, source.stripe_id)
      source.destroy!
    end

  private

    def customer
      @customer ||= BuildCustomerService.new(user: @user).perform!
    end
  end
end
