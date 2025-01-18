require "rails_helper"

RSpec.describe Mutations::LogoutMutation do
  describe "#resolve" do
    subject :execute do
      AppSchema.execute(gql)
    end

    let(:gql) do
      <<~GQL
        mutation Logout {
          logout {
            status
          }
        }
      GQL
    end

    it 'resolves "OK"' do
      expect(execute["errors"]).to be_nil
      expect(execute["data"]["logout"]["status"]).to eql("OK")
    end
  end
end
