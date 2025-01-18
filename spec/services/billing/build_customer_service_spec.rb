require "rails_helper"

RSpec.describe Billing::BuildCustomerService, type: :service do
  describe ".perform!" do
    subject(:perform!) { Billing::BuildCustomerService.perform!(user:) }

    let(:user) { create(:user) }

    it "calls the Stripe API and generates a customer" do
      allow(Stripe::Customer).to receive(:create) { build_stubbed(:stripe_customer) }

      expect { perform! }.to change { Billing::Customer.where(user:).count }
    end
  end
end
