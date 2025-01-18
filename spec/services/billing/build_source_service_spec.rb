require "rails_helper"

RSpec.describe Billing::BuildSourceService, type: :service do
  describe ".perform!" do
    subject(:perform!) { Billing::BuildSourceService.perform!(user:, source: "fake_stripe") }

    let(:user) { create(:user) }
    let!(:customer) { create(:billing_customer, user:) }

    it "calls the Stripe API and generates a source" do
      allow(Stripe::Customer).to receive(:create_source)
        .with(customer.stripe_id, { source: "fake_stripe" }) { build_stubbed(:stripe_source) }

      expect { perform! }.to change { customer.sources.count }
    end
  end
end
