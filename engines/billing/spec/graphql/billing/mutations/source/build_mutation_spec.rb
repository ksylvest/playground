require 'rails_helper'

RSpec.describe Billing::Mutations::Source::BuildMutation do
  describe '#resolve' do
    subject :execute do
      allow(Current).to receive(:user) { user }
      allow(Billing::BuildSourceService).to receive(:perform!).with(user: user, source: source)
      AppSchema.execute(gql, variables: { source: source })
    end

    let(:gql) do
      <<~GQL
        mutation BuildBillingSource($source: String!) {
          buildBillingSource(source: $source) {
            status
          }
        }
      GQL
    end

    let(:user) { create(:user) }
    let(:source) { 'fake_source' }

    it 'resolves "OK"' do
      expect(execute['errors']).to be_nil
      expect(execute['data']['buildBillingSource']['status']).to eql('OK')
    end
  end
end
