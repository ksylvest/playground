require 'rails_helper'

RSpec.describe Sources::ActiveStorageHasManyAttached do
  describe '#fetch' do
    subject(:result) do
      GraphQL::Dataloader.with_dataloading do |dataloader|
        dataloader
          .with(described_class, :photos)
          .request(entry)
          .load
      end
    end

    let!(:entry) { create(:feed_entry, :with_photos) }

    it 'loads attachments' do
      expect(result).to be_present
    end
  end
end
