require 'rails_helper'

RSpec.describe Mutations::User::FollowMutation do
  describe '#resolve' do
    subject :execute do
      Current.auth!(user: user)
      AppSchema.execute(gql, variables: { id: followed.id })
    end

    let(:gql) do
      <<~GQL
        mutation FollowUser($id: ID!) {
          result: followUser(id: $id) {
            user {
              id
              following
            }
          }
        }
      GQL
    end

    let(:user) { create(:user) }
    let(:followed) { create(:user) }

    it 'resolves' do
      expect(execute['errors']).to be_nil
      expect(execute['data']['result']['user']).to be_present
      expect(execute['data']['result']['user']['id']).to eql(followed.id)
      expect(execute['data']['result']['user']['following']).to be_truthy
    end

    it 'builds a follow' do
      expect { execute }.to change { Follow.where(follower: user, followed: followed).count }.by(+1)
    end
  end
end
