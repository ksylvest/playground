require 'rails_helper'

RSpec.describe Types::FeedType do
  describe '#resolve' do
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
              photos {
                id
                url: variant(l: 1280, w: 1280, format: JPG)
              }
              user {
                id
                name
                avatar {
                  id
                  url: variant(l: 96, w: 96, format: JPG)
                }
              }
            }
          }
        }
      GQL
    end

    let(:user) { create(:user, :with_avatar) }
    let!(:entry) { create(:feed_entry, :with_photos) }

    it 'resolves a feed' do
      expect(execute['errors']).to be_nil
      expect(execute['data']['feed']).to be_present
      expect(execute['data']['feed']['entries']).to be_present
    end
  end
end
