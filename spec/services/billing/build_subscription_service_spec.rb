require 'rails_helper'

RSpec.describe Billing::BuildSubscriptionService, type: :service do
  describe '.perform!' do
    subject(:perform!) { described_class.perform!(user: user, plan_id: plan.id) }

    let(:user) { create(:user) }
    let(:plan) { create(:billing_plan) }
    let!(:customer) { create(:billing_customer, user: user) }

    it 'calls the Stripe API and generates a source' do
      expect(Stripe::Subscription).to receive(:create)
        .with(customer: customer.stripe_id, items: [{ plan: plan.stripe_id }])
        .and_return(build_stubbed(:stripe_subscription))

      expect { perform! }.to change { customer.subscriptions.count }
    end
  end
end
