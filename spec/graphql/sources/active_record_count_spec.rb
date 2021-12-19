require 'rails_helper'

RSpec.describe Sources::ActiveRecordCount do
  describe '#fetch' do
    subject(:result) do
      GraphQL::Dataloader.with_dataloading do |dataloader|
        dataloader
          .with(described_class, Notification, key: :user_id)
          .request(user.id)
          .load
      end
    end

    let!(:user) { create(:user) }
    let!(:notifications) { create_pair(:notification, user: user) }

    it 'loads a count' do
      expect(result).to eql(notifications.count)
    end
  end
end
