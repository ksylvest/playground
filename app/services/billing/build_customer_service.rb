module Billing
  class BuildCustomerService
    def self.perform!(...)
      new(...).perform!
    end

    def initialize(user:)
      @user = user
    end

    def perform!
      customer = Billing::Customer.find_or_initialize_by(user: @user)

      unless customer.persisted?
        customer.parse(Stripe::Customer.create)
        customer.save!
      end

      customer
    end
  end
end
