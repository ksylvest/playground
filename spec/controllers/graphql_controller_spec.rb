require "rails_helper"

RSpec.describe GraphqlController, type: :request do
  describe "POST #execute" do
    it "is successful" do
      post graphql_url, params: { query: "{}" }
      expect(response).to have_http_status(:ok)
    end
  end
end
