require 'rails_helper'

RSpec.describe Loaders::AssociationLoader do
  describe '#load' do
    let(:user) { create(:user) }
    let!(:notifications) { create_pair(:notification, user: user) }

    it 'loads an association' do
      results = GraphQL::Batch.batch do
        Loaders::AssociationLoader
          .for(:notifications)
          .load(user)
      end
      expect(results).to include(*notifications)
    end
  end
end
