require "rails_helper"

RSpec.describe Billing::DestroySourceService, type: :service do
  describe ".perform!" do
    subject(:perform!) { Billing::DestroySourceService.perform!(user:, id: source.id) }

    let(:user) { create(:user) }
    let(:customer) { create(:billing_customer, user:) }
    let(:source) { create(:billing_source, customer:) }

    it "calls the Stripe API" do
      expect(Stripe::Customer).to receive(:delete_source)
        .with(customer.stripe_id, source.stripe_id)
      perform!
    end
  end
end
