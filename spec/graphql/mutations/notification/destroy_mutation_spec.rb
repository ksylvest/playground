require 'rails_helper'

RSpec.describe Mutations::Notification::DestroyMutation do
  describe '#resolve' do
    subject :execute do
      Current.auth!(user)
      AppSchema.execute(gql, variables: { id: notification.id })
    end

    let(:gql) do
      <<~GQL
        mutation DestroyNotification($id: ID!) {
          destroyNotification(id: $id) {
            notification {
              id
              deleted
            }
          }
        }
      GQL
    end

    let(:user) { create(:user) }
    let!(:notification) { create(:notification, user: user) }

    it 'resolves "OK"' do
      expect(execute['errors']).to be_nil
      expect(execute['data']['destroyNotification']['notification']).to be_present
      expect(execute['data']['destroyNotification']['notification']['id']).to eql(notification.id)
      expect(execute['data']['destroyNotification']['notification']['deleted']).to be_truthy
    end
  end
end
