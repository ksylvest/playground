require "rails_helper"

RSpec.describe Mutations::Profile::ChangeMutation do
  describe "#resolve" do
    subject :execute do
      AppSchema.execute(gql, variables: { input: }, context: { authentication: })
    end

    let(:gql) do
      <<~GQL
        mutation ChangeProfile($input: UserInput!) {
          changeProfile(input: $input) {
            status
          }
        }
      GQL
    end

    let(:authentication) { create(:authentication, user:) }
    let(:user) { create(:user) }

    context "with valid input" do
      let :input do
        {
          name: "George Harrison",
          email: "george.harrison@beatles.com",
        }
      end

      it 'resolves "OK"' do
        expect(execute["errors"]).to be_nil
        expect(execute["data"]["changeProfile"]["status"]).to eql("OK")
      end
    end

    context "with invalid input" do
      let :input do
        {
          name: "",
          email: "",
        }
      end

      it 'resolves "UNPROCESSABLE"' do
        expect(execute["errors"]).to be_nil
        expect(execute["data"]["changeProfile"]["status"]).to eql("UNPROCESSABLE")
      end
    end
  end
end
