require "rails_helper"

RSpec.describe Mutations::Avatar::AttachMutation do
  describe "#resolve" do
    subject :execute do
      AppSchema.execute(gql, variables: { id: SecureRandom.uuid }, context: { authentication: })
    end

    let(:gql) do
      <<~GQL
        mutation AttachAvatar($id: ID!) {
          attachAvatar(id: $id) {
            status
          }
        }
      GQL
    end

    let(:authentication) { create(:authentication, user:) }
    let(:user) { create(:user) }

    it 'resolves "OK"' do
      expect(user.avatar).to receive(:attach)
      expect(execute["errors"]).to be_nil
      expect(execute["data"]["attachAvatar"]["status"]).to eql("OK")
    end
  end
end
