require 'rails_helper'

RSpec.describe Mutations::Billing::Source::DefaultMutation do
  describe '#resolve' do
    subject :execute do
      Current.auth!(user)
      allow(Billing::DefaultSourceService).to receive(:perform!).with(user: user, id: id)
      AppSchema.execute(gql, variables: { id: id })
    end

    let(:gql) do
      <<~GQL
        mutation DefaultBillingSource($id: ID!) {
          result: defaultBillingSource(id: $id) {
            billing {
              id
              customer {
                id
                sources {
                  id
                  number
                  brand
                  exp
                  default
                }
              }
            }
          }
        }
      GQL
    end

    let(:user) { create(:user) }
    let(:id) { 'fake_id' }

    it 'resolves without errors' do
      expect(execute['errors']).to be_nil
      expect(execute['data']['result']['billing']).to be_present
    end
  end
end
