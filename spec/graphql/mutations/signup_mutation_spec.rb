require "rails_helper"

RSpec.describe Mutations::SignupMutation do
  describe "#resolve" do
    subject(:execute) do
      AppSchema.execute(gql, variables: { input: })
    end

    let(:gql) do
      <<~GQL
        mutation Signup($input: SignupInput!) {
          signup(input: $input) {
            status
          }
        }
      GQL
    end

    context "with valid input" do
      let(:input) do
        {
          name: "George Harrison",
          email: "george.harrison@beatles.com",
          password: "password",
        }
      end

      it 'resolves "OK"' do
        expect(execute["errors"]).to be_nil
        expect(execute["data"]["signup"]["status"]).to eql("OK")
      end
    end

    context "with invalid input" do
      let(:input) do
        {
          name: "",
          email: "",
          password: "",
        }
      end

      it 'resolves "UNPROCESSABLE"' do
        expect(execute["data"]["signup"]["status"]).to eql("UNPROCESSABLE")
      end
    end
  end
end
