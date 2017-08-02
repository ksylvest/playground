require 'rails_helper'

RSpec.describe API::AuthsController, type: :request do
  let(:user) { Fabricate(:user) }

  describe 'POST #create' do
    it 'authenticates with valid parameters' do
      expect {
        post api_auth_path(format: :json), params: {
          auth: {
            email: user.email,
            password: user.password,
          },
        }
        expect(response).to have_http_status(200)
      }.to change { Session.count }
    end

    it 'does not authenticate with invalid parameters' do
      expect {
        post api_auth_url(format: :json), params: {
          auth: {
            email: user.password,
            password: user.password.reverse,
          },
        }
        expect(response).to have_http_status(422)
      }.to_not change { Session.count }
    end
  end

  describe 'DELETE #destroy' do
    it 'is successful if authenticated' do
      delete api_auth_url(format: :json)
      expect(response).to have_http_status(204)
    end
  end
end
