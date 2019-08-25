require 'rails_helper'

RSpec.describe Types::UserType do
  describe '#resolve' do
    subject(:execute) do
      Current.auth!(user: user)
      AppSchema.execute(gql)
    end

    let(:gql) do
      <<~GQL
        query User {
          user {
            id
            name
            email
            avatar {
              id
              url
            }
          }
        }
      GQL
    end

    let(:user) { create(:user) }

    it 'resolves' do
      expect(execute['errors']).to be_nil
      expect(execute['data']['user']).to be_present
      expect(execute['data']['user']['id']).to eql(user.id)
      expect(execute['data']['user']['name']).to eql(user.name)
      expect(execute['data']['user']['email']).to eql(user.email)
    end
  end
end
