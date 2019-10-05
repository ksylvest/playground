require 'rails_helper'

RSpec.describe Loaders::HTTPLoader do
  let(:host) { 'https://fake.test' }

  describe '#load' do
    it 'performs multiple HTTP requests in parallel' do
      stub_request(:get, 'https://fake.test/path')

      status = GraphQL::Batch.batch do
        Loaders::HTTPLoader
          .for(host: host)
          .load(->(connection) { connection.get('/path') })
          .then(&:status)
      end
      expect(status).to be_ok
    end
  end
end
