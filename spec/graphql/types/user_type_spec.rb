require 'rails_helper'

RSpec.describe Types::UserType do
  describe '#resolve' do
    subject(:execute) do
      Current.auth!(user)
      AppSchema.execute(gql)
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
              variant(options: { w: 8, h: 8, resize: FILL, format: WEBP })
            }
          }
        }
      GQL
    end

    let(:user) { create(:user, :with_avatar) }

    it 'resolves' do
      expect(execute['errors']).to be_nil
      expect(execute['data']['me']).to be_present
      expect(execute['data']['me']['id']).to eql(user.id)
      expect(execute['data']['me']['name']).to eql(user.name)
      expect(execute['data']['me']['email']).to eql(user.email)
      expect(execute['data']['me']['avatar']).to be_present
      expect(execute['data']['me']['avatar']['id']).to be_present
    end
  end
end
