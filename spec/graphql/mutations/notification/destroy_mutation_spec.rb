require "rails_helper"

RSpec.describe Mutations::Notification::DestroyMutation do
  describe "#resolve" do
    subject :execute do
      AppSchema.execute(gql, variables: { id: notification.id }, context: { authentication: })
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

    let(:authentication) { create(:authentication, user:) }
    let(:user) { create(:user) }
    let!(:notification) { create(:notification, user:) }

    it 'resolves "OK"' do
      expect(execute["errors"]).to be_nil
      expect(execute["data"]["destroyNotification"]["notification"]).to be_present
      expect(execute["data"]["destroyNotification"]["notification"]["id"]).to eql(notification.id)
      expect(execute["data"]["destroyNotification"]["notification"]["deleted"]).to be_truthy
    end
  end
end
