require 'rails_helper'

RSpec.describe Mutations::Avatar::AttachMutation do
  describe '#resolve' do
    subject :execute do
      Current.auth!(user: user)
      AppSchema.execute(gql, variables: { id: SecureRandom.uuid })
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

    let(:user) { create(:user) }
    let(:session) { create(:session, user: user) }

    it 'resolves "OK"' do
      expect(user.avatar).to receive(:attach)
      expect(execute['errors']).to be_nil
      expect(execute['data']['attachAvatar']['status']).to eql('OK')
    end
  end
end
