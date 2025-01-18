require "rails_helper"

RSpec.describe Mutations::LoginMutation do
  describe "#resolve" do
    subject :execute do
      AppSchema.execute(gql, variables: { input: })
    end

    let(:gql) do
      <<~GQL
        mutation Login($input: LoginInput!) {
          login(input: $input) {
            status
          }
        }
      GQL
    end

    let(:user) { create(:user) }
    let(:input) { user.slice(:email, :password) }

    it 'resolves "OK"' do
      expect(execute["errors"]).to be_nil
      expect(execute["data"]["login"]["status"]).to eql("OK")
    end
  end
end
