require 'rails_helper'

RSpec.describe Billing::BuildCustomerService, type: :service do
  describe '.perform!' do
    subject(:perform!) { Billing::BuildCustomerService.perform!(user: user) }

    let(:user) { create(:user) }

    it 'calls the Stripe API and generates a customer' do
      expect(Stripe::Customer).to receive(:create) { build_stubbed(:stripe_customer) }

      expect { perform! }.to change { Billing::Customer.where(user: user).count }
    end
  end
end
