require 'rails_helper'

RSpec.describe Sources::ActiveStorageAttachment do
  describe '#fetch' do
    subject(:result) do
      GraphQL::Dataloader.with_dataloading do |dataloader|
        dataloader
          .with(described_class, :avatar, kind: :attachment)
          .request(user)
          .load
      end
    end

    let(:user) { create(:user, :with_avatar) }

    it 'loads an attachment' do
      expect(result).to eql(user.avatar)
    end
  end
end
