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
                url
              }
              user {
                id
                name
                avatar {
                  id
                  url
                }
              }
            }
          }
        }
      GQL
    end

    let!(:entry) { create(:feed_entry) }

    it 'resolves a feed' do
      expect(execute['errors']).to be_nil
      expect(execute['data']['feed']).to be_present
      expect(execute['data']['feed']['entries']).to be_present
    end
  end
end
