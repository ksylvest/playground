require 'rails_helper'

RSpec.describe Sources::Cache do
  describe '#fetch' do
    subject(:result) do
      GraphQL::Dataloader.with_dataloading do |dataloader|
        dataloader
          .with(described_class)
          .request(key: 'key', value: -> { 'value' })
          .load
      end
    end

    it 'loads a cache' do
      expect(result).to eql('value')
    end
  end
end
