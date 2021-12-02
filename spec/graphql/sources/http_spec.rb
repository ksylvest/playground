require 'rails_helper'

RSpec.describe Sources::HTTP do
  subject(:result) do
    GraphQL::Dataloader.with_dataloading do |dataloader|
      dataloader
        .with(described_class, host: host)
        .request(->(connection) { connection.get('/path') })
        .load
    end
  end

  let(:host) { 'https://fake.test' }

  describe '#fetch' do
    it 'loads via HTTP' do
      stub_request(:get, 'https://fake.test/path')
      expect(result.status).to be_ok
    end
  end
end
