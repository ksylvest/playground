require "rails_helper"

RSpec.describe Mutations::Feed::Entry::LikeMutation do
  describe "#resolve" do
    subject :execute do
      AppSchema.execute(gql, variables: { id: entry.id }, context: { authentication: })
    end

    let(:gql) do
      <<~GQL
        mutation LikeFeedEntry($id: ID!) {
          likeFeedEntry(id: $id) {
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

    it "resolves" do
      expect(execute["errors"]).to be_nil
      expect(execute["data"]["likeFeedEntry"]["entry"]).to be_present
      expect(execute["data"]["likeFeedEntry"]["entry"]["id"]).to eql(entry.id)
      expect(execute["data"]["likeFeedEntry"]["entry"]["liked"]).to be_truthy
      expect(execute["data"]["likeFeedEntry"]["entry"]["likes"]).to eql(entry.likes.count)
    end

    it "builds a like" do
      expect { execute }.to change { Feed::Like.where(entry:).count }.by(+1)
    end
  end
end
