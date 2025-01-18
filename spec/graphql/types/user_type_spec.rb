require "rails_helper"

RSpec.describe Types::UserType do
  describe "#resolve" do
    subject(:execute) do
      AppSchema.execute(gql, context: { authentication: })
    end

    let(:gql) do
      <<~GQL
        query User {
          me {
            id
            name
            email
            avatar {
              id
              filename
            }
          }
        }
      GQL
    end

    let(:authentication) { create(:authentication, user:) }
    let(:user) { create(:user, :with_avatar) }

    it "resolves" do
      expect(execute["errors"]).to be_nil
      expect(execute["data"]["me"]).to be_present
      expect(execute["data"]["me"]["id"]).to eql(user.id)
      expect(execute["data"]["me"]["name"]).to eql(user.name)
      expect(execute["data"]["me"]["email"]).to eql(user.email)
      expect(execute["data"]["me"]["avatar"]).to be_present
      expect(execute["data"]["me"]["avatar"]["id"]).to be_present
    end
  end
end
