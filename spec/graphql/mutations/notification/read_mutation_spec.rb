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
            notification {
              id
              read
            }
          }
        }
      GQL
    end

    let(:user) { create(:user) }
    let!(:notification) { create(:notification, user: user) }

    it 'resolves' do
      expect(execute['errors']).to be_nil
      expect(execute['data']['readNotification']['notification']).to be_present
      expect(execute['data']['readNotification']['notification']['id']).to eql(notification.id)
      expect(execute['data']['readNotification']['notification']['read']).to be_truthy
    end
  end
end
