require 'rails_helper'

RSpec.describe Mutations::Billing::Subscription::BuildMutation do
  describe '#resolve' do
    subject :execute do
      Current.auth!(user: user)
      allow(Billing::BuildSubscriptionService).to receive(:perform!).with(user: user, plan_id: plan_id)
      AppSchema.execute(gql, variables: { planID: plan_id })
    end

    let(:gql) do
      <<~GQL
        mutation BuildBillingSubscription($planID: ID!) {
          result: buildBillingSubscription(planID: $planID) {
            status
          }
        }
      GQL
    end

    let(:user) { create(:user) }
    let(:plan_id) { 'fake_plan_id' }

    it 'resolves "OK"' do
      expect(execute['errors']).to be_nil
      expect(execute['data']['result']['status']).to eql('OK')
    end
  end
end
