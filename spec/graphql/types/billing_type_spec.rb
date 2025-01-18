require "rails_helper"

RSpec.describe Types::BillingType do
  describe "#resolve" do
    subject(:execute) do
      AppSchema.execute(gql, context: { authentication: })
    end

    let(:gql) do
      <<~GQL
        query Billing {
          billing {
            id
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
            }
          }
        }
      GQL
    end

    let(:authentication) { create(:authentication, user:) }
    let!(:user) { create(:user) }
    let!(:customer) { create(:billing_customer, user:) }
    let!(:source) { create(:billing_source, customer:) }

    it "resolves" do
      expect(execute["errors"]).to be_nil
      expect(execute["data"]["billing"]).to be_present
      expect(execute["data"]["billing"]["customer"]).to be_present
      expect(execute["data"]["billing"]["customer"]["sources"]).to be_present
    end
  end
end
