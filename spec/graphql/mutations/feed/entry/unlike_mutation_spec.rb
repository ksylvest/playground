require "rails_helper"

RSpec.describe Mutations::Feed::Entry::UnlikeMutation do
  describe "#resolve" do
    subject :execute do
      AppSchema.execute(gql, variables: { id: entry.id }, context: { authentication: })
    end

    let(:gql) do
      <<~GQL
        mutation UnlikeFeedEntry($id: ID!) {
          unlikeFeedEntry(id: $id) {
            entry {
              id
              liked
              likes
            }
          }
        }
      GQL
    end

    let(:authentication) { create(:authentication, user:) }
    let(:user) { create(:user) }
    let(:entry) { create(:feed_entry, user:) }
    let!(:like) { create(:feed_like, entry:, user:) }

    it "resolves" do
      expect(execute["errors"]).to be_nil
      expect(execute["data"]["unlikeFeedEntry"]["entry"]).to be_present
      expect(execute["data"]["unlikeFeedEntry"]["entry"]["id"]).to eql(entry.id)
      expect(execute["data"]["unlikeFeedEntry"]["entry"]["liked"]).to be_falsey
      expect(execute["data"]["unlikeFeedEntry"]["entry"]["likes"]).to eql(entry.likes.count)
    end

    it "destroys a like" do
      expect { execute }.to change { Feed::Like.where(entry:).count }.by(-1)
    end
  end
end
