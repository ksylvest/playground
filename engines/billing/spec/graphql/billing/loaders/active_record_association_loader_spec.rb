require 'rails_helper'

RSpec.describe Billing::Loaders::ActiveRecordAssociationLoader do
  describe '#load' do
    let(:customer) { create(:billing_customer) }
    let!(:sources) { create_pair(:billing_source, customer: customer) }

    it 'loads an association' do
      results = GraphQL::Batch.batch do
        described_class
          .for(:sources)
          .load(customer)
      end
      expect(results).to include(*sources)
    end
  end
end
