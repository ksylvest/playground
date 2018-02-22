require 'rails_helper'

RSpec.describe UsersController, type: :request do
  let(:user) { Fabricate.build(:user) }

  describe 'POST #create' do
    it 'succeeds with valid parameters' do
      expect {
        post user_path, params: { user: { name: user.name, email: user.email, password: user.password } }, as: :json
        expect(response).to have_http_status(200)
      }.to change { User.count }
    end

    it 'fails with invalid parameters' do
      expect {
        post user_path, params: { user: { name: user.name, email: user.password, password: user.email } }, as: :json
        expect(response).to have_http_status(422)
      }.to_not change { User.count }
    end
  end

end
