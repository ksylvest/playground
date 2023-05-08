require 'rails_helper'

RSpec.describe Billing::DestroyPaymentMethodService, type: :service do
  describe '.perform!' do
    subject(:perform!) { Billing::DestroyPaymentMethodService.perform!(user: user, id: payment_method.id) }

    let(:user) { create(:user) }
    let(:customer) { create(:billing_customer, user: user) }
    let(:payment_method) { create(:billing_payment_method, customer: customer) }

    it 'calls the Stripe API' do
      expect(Stripe::Customer).to receive(:delete_source)
        .with(customer.stripe_id, payment_method.stripe_id)
      perform!
    end
  end
end
