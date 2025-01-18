require "rails_helper"

RSpec.describe Mutations::Authentication::DestroyMutation do
  describe "#resolve" do
    subject :execute do
      AppSchema.execute(gql, variables: { id: authentication.id }, context: { authentication: })
    end

    let(:gql) do
      <<~GQL
        mutation DestroyAuthentication($id: String!) {
          result: destroyAuthentication(id: $id) {
            authentication {
              id
              deleted
            }
          }
        }
      GQL
    end

    let!(:authentication) { create(:authentication, user:) }
    let(:user) { create(:user) }

    it 'resolves "OK"' do
      expect(execute["errors"]).to be_nil
      expect(execute["data"]["result"]["authentication"]).to be_present
      expect(execute["data"]["result"]["authentication"]["id"]).to eql(authentication.id)
      expect(execute["data"]["result"]["authentication"]["deleted"]).to be_truthy
    end
  end
end
