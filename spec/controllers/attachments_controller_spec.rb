require 'rails_helper'

RSpec.describe AttachmentsController, type: :request do
  let(:user) { create(:user, :with_avatar) }
  let(:attachment) { user.avatar }

  describe 'GET #show' do
    subject(:fetch) do
      get attachment_path(attachment.id), params: { w: w, h: h, format: format, resize: resize }
    end

    let(:w) { 8 }
    let(:h) { 8 }
    let(:resize) { :fill }

    context 'with valid attributes' do
      let(:format) { :jpg }

      it 'redirects to a variant' do
        fetch
        expect(response).to have_http_status(:redirect)
      end
    end

    context 'with invalid attributes' do
      let(:format) { :gif }

      it 'responds unprocessable' do
        fetch
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
