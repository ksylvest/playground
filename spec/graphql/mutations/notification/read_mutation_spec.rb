require "rails_helper"

RSpec.describe Mutations::Notification::ReadMutation do
  describe "#resolve" do
    subject :execute do
      AppSchema.execute(gql, variables: { id: notification.id }, context: { authentication: })
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

    let(:authentication) { create(:authentication, user:) }
    let(:user) { create(:user) }
    let!(:notification) { create(:notification, user:) }

    it "resolves" do
      expect(execute["errors"]).to be_nil
      expect(execute["data"]["readNotification"]["notification"]).to be_present
      expect(execute["data"]["readNotification"]["notification"]["id"]).to eql(notification.id)
      expect(execute["data"]["readNotification"]["notification"]["read"]).to be_truthy
    end
  end
end
