require 'rails_helper'

RSpec.describe Twilio::VoicesController, type: :request do
  describe 'GET #show' do
    it 'is successful' do
      get twilio_voice_path, params: { dial: '555-555-5555' }
      expect(response).to have_http_status(:ok)
    end
  end
end
