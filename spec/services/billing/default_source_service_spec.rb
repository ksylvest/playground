require "rails_helper"

RSpec.describe Billing::DefaultSourceService, type: :service do
  describe ".perform!" do
    subject(:perform!) { Billing::DefaultSourceService.perform!(user:, id: source.id) }

    let(:user) { create(:user) }
    let(:customer) { create(:billing_customer, user:) }
    let(:source) { create(:billing_source, customer:) }

    it "calls the Stripe API" do
      expect(Stripe::Customer).to receive(:update)
        .with(customer.stripe_id, { default_source: source.stripe_id })
      perform!
    end
  end
end
