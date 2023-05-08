require 'rails_helper'

RSpec.describe Mutations::Billing::PaymentMethod::BuildMutation do
  describe '#resolve' do
    subject :execute do
      Current.auth!(user)
      allow(Billing::BuildPaymentMethodService).to receive(:perform!).with({ user: user, source: source })
      AppSchema.execute(gql, variables: { source: source })
    end

    let(:gql) do
      <<~GQL
        mutation BuildBillingPaymentMethod($source: String!) {
          result: buildBillingPaymentMethod(source: $source) {
            billing {
              id
              customer {
                id
                sources: paymentMethods {
                  id
                  number
                  brand
                  exp
                  default
                }
              }
            }
          }
        }
      GQL
    end

    let(:user) { create(:user) }
    let(:source) { 'fake_source' }

    it 'resolves without errors' do
      expect(execute['errors']).to be_nil
      expect(execute['data']['result']['billing']).to be_present
    end
  end
end
