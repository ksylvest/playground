require 'rails_helper'

RSpec.describe Types::BillingType do
  describe '#resolve' do
    subject(:execute) do
      Current.auth!(user)
      AppSchema.execute(gql)
    end

    let(:gql) do
      <<~GQL
        query Billing {
          billing {
            id
            customer {
              id
              currency
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
      GQL
    end

    let!(:user) { create(:user) }
    let!(:customer) { create(:billing_customer, user: user) }
    let!(:payment_method) { create(:billing_payment_method, customer: customer) }

    it 'resolves' do
      expect(execute['errors']).to be_nil
      expect(execute['data']['billing']).to be_present
      expect(execute['data']['billing']['customer']).to be_present
      expect(execute['data']['billing']['customer']['sources']).to be_present
    end
  end
end
