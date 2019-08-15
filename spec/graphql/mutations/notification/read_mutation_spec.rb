require 'rails_helper'

RSpec.describe Mutations::Notification::ReadMutation do
  describe '#resolve' do
    subject :execute do
      Current.auth!(user: user)
      AppSchema.execute(gql, variables: { id: notification.id })
    end

    let(:gql) do
      <<~GQL
        mutation ReadNotification($id: ID!) {
          readNotification(id: $id) {
            status
          }
        }
      GQL
    end

    let(:user) { create(:user) }
    let!(:notification) { create(:notification, user: user) }

    it 'resolves "OK"' do
      expect(execute['errors']).to be_nil
      expect(execute['data']['readNotification']['status']).to eql('OK')
    end
  end
end
