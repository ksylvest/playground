require 'rails_helper'

RSpec.describe Sources::Feed::Liked do
  describe '#load' do
    let(:user) { create(:user) }
    let!(:entry) { create(:feed_entry) }

    let(:liked) do
      GraphQL::Dataloader.with_dataloading do |dataloader|
        dataloader
          .with(described_class, user)
          .request(entry)
          .load
      end
    end

    context 'when liked by another user' do
      let!(:like) { create(:feed_like, entry: entry) }

      it 'loads a that is is liked' do
        expect(liked).to be_falsey
      end
    end

    context 'when liked by this user' do
      let!(:like) { create(:feed_like, entry: entry, user: user) }

      it 'loads a that is is liked' do
        expect(liked).to be_truthy
      end
    end
  end
end
