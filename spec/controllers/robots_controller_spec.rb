require "rails_helper"

RSpec.describe RobotsController, type: :request do
  describe "GET #show" do
    it 'returns an http status of "ok"' do
      get robots_path
      expect(response).to have_http_status(:ok)
    end
  end
end
