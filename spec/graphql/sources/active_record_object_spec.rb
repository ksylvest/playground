require 'rails_helper'

RSpec.describe Sources::ActiveRecordObject do
  describe '#fetch' do
    subject(:result) do
      GraphQL::Dataloader.with_dataloading do |dataloader|
        dataloader
          .with(described_class, User, key: :id)
          .request(user.id)
          .load
      end
    end

    let!(:user) { create(:user) }

    it 'loads a record' do
      expect(result).to eql(user)
    end
  end
end
