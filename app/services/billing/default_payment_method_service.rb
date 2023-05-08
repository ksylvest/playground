module Billing
  class DefaultPaymentMethodService
    def self.perform!(...)
      new(...).perform!
    end

    def initialize(user:, id:)
      @user = user
      @id = id
    end

    def perform!
      payment_method = customer.payment_methods.find(@id)
      Stripe::Customer.update(customer.stripe_id, invoice_settings: { default_payment_method: payment_method.stripe_id })
      sync!
    end

  private

    def sync!
      Billing::PaymentMethod.transaction do
        customer.payment_methods.each do |payment_method|
          payment_method.default = payment_method.id.eql?(@id)
          payment_method.save!
        end
      end
    end

    def customer
      @customer ||= BuildCustomerService.perform!(user: @user)
    end
  end
end
