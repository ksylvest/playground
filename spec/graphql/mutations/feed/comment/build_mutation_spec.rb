require "rails_helper"

RSpec.describe Mutations::Feed::Comment::BuildMutation do
  describe "#resolve" do
    subject :execute do
      AppSchema.execute(gql, variables: { input: }, context: { authentication: })
    end

    let(:gql) do
      <<~GQL
        mutation BuildFeedComment($input: Feed__CommentInput!) {
          buildFeedComment(input: $input) {
            status
            errors {
              messages
            }
            comment {
              id
              message
              user {
                id
                name
              }
            }
          }
        }
      GQL
    end

    let(:input) do
      {
        entryID: entry.id,
        message:,
      }
    end

    let(:authentication) { create(:authentication, user:) }
    let(:user) { create(:user) }
    let(:entry) { create(:feed_entry, user:) }

    context "with valid input" do
      let(:message) { "The quick brown fox jumped over the lazy dog." }

      it "resolves" do
        expect(execute["errors"]).to be_nil
        expect(execute["data"]["buildFeedComment"]["status"]).to eql("OK")
        expect(execute["data"]["buildFeedComment"]["comment"]).to be_present
        expect(execute["data"]["buildFeedComment"]["comment"]["message"]).to eql(message)
        expect(execute["data"]["buildFeedComment"]["comment"]["user"]).to be_present
        expect(execute["data"]["buildFeedComment"]["comment"]["user"]["id"]).to eql(user.id)
        expect(execute["data"]["buildFeedComment"]["comment"]["user"]["name"]).to eql(user.name)
      end

      it "builds a comment" do
        expect { execute }.to change { Feed::Comment.where(entry:).count }
      end
    end

    context "with invalid input" do
      let(:message) { "" }

      it "resolves" do
        expect(execute["errors"]).to be_nil
        expect(execute["data"]["buildFeedComment"]["status"]).to eql("UNPROCESSABLE")
        expect(execute["data"]["buildFeedComment"]["errors"]).to be_present
        expect(execute["data"]["buildFeedComment"]["errors"]["messages"]).to be_present
      end

      it "does not build a comment" do
        expect { execute }.not_to change(Feed::Comment, :count)
      end
    end
  end
end
