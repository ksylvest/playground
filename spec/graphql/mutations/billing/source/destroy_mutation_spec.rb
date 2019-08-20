require 'rails_helper'

RSpec.describe Mutations::Billing::Source::DestroyMutation do
  describe '#resolve' do
    subject :execute do
      Current.auth!(user: user)
      allow(Billing::DestroySourceService).to receive(:perform!).with(user: user, id: id)
      AppSchema.execute(gql, variables: { id: id })
    end

    let(:gql) do
      <<~GQL
        mutation DestroyBillingSource($id: ID!) {
          destroyBillingSource(id: $id) {
            status
          }
        }
      GQL
    end

    let(:user) { create(:user) }
    let(:id) { 'fake_id' }

    it 'resolves "OK"' do
      expect(execute['errors']).to be_nil
      expect(execute['data']['destroyBillingSource']['status']).to eql('OK')
    end
  end
end
