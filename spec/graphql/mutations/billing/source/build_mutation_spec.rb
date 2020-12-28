require 'rails_helper'

RSpec.describe Mutations::Billing::Source::BuildMutation do
  describe '#resolve' do
    subject :execute do
      Current.auth!(user)
      allow(Billing::BuildSourceService).to receive(:perform!).with(user: user, source: source)
      AppSchema.execute(gql, variables: { source: source })
    end

    let(:gql) do
      <<~GQL
        mutation BuildBillingSource($source: String!) {
          result: buildBillingSource(source: $source) {
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
    let(:source) { 'fake_source' }

    it 'resolves without errors' do
      expect(execute['errors']).to be_nil
      expect(execute['data']['result']['billing']).to be_present
    end
  end
end
