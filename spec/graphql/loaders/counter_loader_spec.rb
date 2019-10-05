require 'rails_helper'

RSpec.describe Loaders::CounterLoader do
  describe '#load' do
    let(:user) { create(:user) }
    let!(:notifications) { create_pair(:notification, user: user) }

    it 'loads a count' do
      count = GraphQL::Batch.batch do
        Loaders::CounterLoader.for(Notification, key: :user_id).load(user.id)
      end
      expect(count).to eql(notifications.count)
    end
  end
end
