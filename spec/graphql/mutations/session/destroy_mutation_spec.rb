require 'rails_helper'

RSpec.describe Mutations::Session::DestroyMutation do
  describe '#resolve' do
    subject :execute do
      Current.auth!(user: user)
      AppSchema.execute(gql, variables: { id: session.id })
    end

    let(:gql) do
      <<~GQL
        mutation DestroySession($id: String!) {
          destroySession(id: $id) {
            status
          }
        }
      GQL
    end

    let(:user) { create(:user) }
    let!(:session) { create(:session, user: user) }

    it 'resolves "OK"' do
      expect(execute['errors']).to be_nil
      expect(execute['data']['destroySession']['status']).to eql('OK')
    end
  end
end
