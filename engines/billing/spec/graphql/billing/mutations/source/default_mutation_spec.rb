require 'rails_helper'

RSpec.describe Billing::Mutations::Source::DefaultMutation do
  describe '#resolve' do
    subject :execute do
      allow(Current).to receive(:user) { user }
      allow(Billing::DefaultSourceService).to receive(:perform!).with(user: user, id: id)
      AppSchema.execute(gql, variables: { id: id })
    end

    let(:gql) do
      <<~GQL
        mutation DefaultBillingSource($id: ID!) {
          defaultBillingSource(id: $id) {
            status
          }
        }
      GQL
    end

    let(:user) { create(:user) }
    let(:id) { 'fake_id' }

    it 'resolves "OK"' do
      expect(execute['errors']).to be_nil
      expect(execute['data']['defaultBillingSource']['status']).to eql('OK')
    end
  end
end
