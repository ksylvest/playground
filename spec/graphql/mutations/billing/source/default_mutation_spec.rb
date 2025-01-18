require "rails_helper"

RSpec.describe Mutations::Billing::Source::DefaultMutation do
  describe "#resolve" do
    subject :execute do
      allow(Billing::DefaultSourceService).to receive(:perform!).with({ user:, id: })
      AppSchema.execute(gql, variables: { id: }, context: { authentication: })
    end

    let(:gql) do
      <<~GQL
        mutation DefaultBillingSource($id: ID!) {
          result: defaultBillingSource(id: $id) {
            billing {
              id
              customer {
                id
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
        }
      GQL
    end

    let(:authentication) { create(:authentication, user:) }
    let(:user) { create(:user) }
    let(:id) { "fake_id" }

    it "resolves without errors" do
      expect(execute["errors"]).to be_nil
      expect(execute["data"]["result"]["billing"]).to be_present
    end
  end
end
