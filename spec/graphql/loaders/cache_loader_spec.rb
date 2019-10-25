require 'rails_helper'

RSpec.describe Loaders::CacheLoader do
  describe '#load' do
    context 'without a warmed cache' do
      it 'fetches' do
        value = GraphQL::Batch.batch do
          Loaders::CacheLoader.for.load(key: 'key', value: -> { 'value' })
        end
        expect(value).to eql('value')
      end
    end
  end
end
