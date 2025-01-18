require "rails_helper"

RSpec.describe MainController, type: :request do
  describe "GET #index" do
    it 'returns an http status of "ok"' do
      get root_path
      expect(response).to have_http_status(:ok)
    end
  end
end
