require 'rails_helper'

RSpec.describe Mutations::Avatar::DetachMutation do
  describe '#resolve' do
    subject :execute do
      Current.auth!(user)
      AppSchema.execute(gql)
    end

    let(:gql) do
      <<~GQL
        mutation DetachAvatar {
          detachAvatar {
            status
          }
        }
      GQL
    end

    let(:user) { create(:user) }
    let(:session) { create(:session, user: user) }

    it 'resolves "OK"' do
      expect(user.avatar).to receive(:detach)
      expect(execute['errors']).to be_nil
      expect(execute['data']['detachAvatar']['status']).to eql('OK')
    end
  end
end
