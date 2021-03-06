module Billing
  class DefaultSourceService
    def self.perform!(...)
      new(...).perform!
    end

    def initialize(user:, id:)
      @user = user
      @id = id
    end

    def perform!
      source = customer.sources.find(@id)
      Stripe::Customer.update(customer.stripe_id, default_source: source.stripe_id)
      sync!
    end

  private

    def sync!
      Billing::Source.transaction do
        customer.sources.each do |source|
          source.default = source.id.eql?(@id)
          source.save!
        end
      end
    end

    def customer
      @customer ||= BuildCustomerService.perform!(user: @user)
    end
  end
end
