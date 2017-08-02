require 'rails_helper'

RSpec.describe MainController, type: :request do
  describe 'GET #index' do
    it 'returns http success' do
      get root_path
      expect(response).to have_http_status(200)
    end
  end
end
