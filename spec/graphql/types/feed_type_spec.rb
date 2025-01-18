require "rails_helper"

RSpec.describe Types::FeedType do
  describe "#resolve" do
    subject(:execute) do
      AppSchema.execute(gql)
    end

    let(:gql) do
      <<~GQL
        query Feed {
          feed {
            entries {
              id
              tags
              likes
              liked
              comments {
                id
                message
                sent
                user {
                  id
                  name
                }
              }
              photos {
                id
                filename
              }
              user {
                id
                name
                avatar {
                  id
                  filename
                }
              }
            }
          }
        }
      GQL
    end

    let(:user) { create(:user, :with_avatar) }
    let!(:entry) { create(:feed_entry, :with_photos) }
    let!(:comment) { create(:feed_comment, entry:) }
    let!(:like) { create(:feed_like, entry:) }

    it "resolves a feed" do
      expect(execute["errors"]).to be_nil
      expect(execute["data"]["feed"]).to be_present
      expect(execute["data"]["feed"]["entries"]).to be_present
    end
  end
end
