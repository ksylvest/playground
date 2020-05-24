require 'rails_helper'

RSpec.describe Types::BillingType do
  describe '#resolve' do
    subject(:execute) do
      Current.auth!(user: user)
      AppSchema.execute(gql)
    end

    let(:gql) do
      <<~GQL
        query Billing {
          billing {
            customer {
              id
              currency
              sources {
                id
                number
                brand
                exp
                default
              }
              subscriptions {
                id
                plan {
                  id
                  amount
                  currency
                  interval
                }
              }
            }
            products {
              id
              name
              plans {
                id
                amount
                currency
                interval
              }
            }
          }
        }
      GQL
    end

    let!(:user) { create(:user) }
    let!(:customer) { create(:billing_customer, user: user) }
    let!(:sources) { create_pair(:billing_source, customer: customer) }
    let!(:product) { create(:billing_product) }
    let!(:plans) { create_pair(:billing_plan, product: product) }
    let!(:subscription) { create(:billing_subscription, customer: customer) }

    it 'resolves' do
      expect(execute['errors']).to be_nil
      expect(execute['data']['billing']).to be_present
      expect(execute['data']['billing']['customer']).to be_present
      expect(execute['data']['billing']['customer']['sources']).to be_present
      expect(execute['data']['billing']['customer']['subscriptions']).to be_present
      expect(execute['data']['billing']['products']).to be_present
    end
  end
end
