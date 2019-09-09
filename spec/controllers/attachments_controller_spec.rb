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
    let(:format) { :jpg }
    let(:resize) { :fill }

    it 'redirects to a variant' do
      fetch
      expect(response).to have_http_status(:redirect)
    end

    context 'with an invalid format' do
      let(:format) { :gif }

      it 'raises an "ArgumentError" with an invalid format' do
        expect { fetch }.to raise_error(ArgumentError, 'invalid option for format: "gif"')
      end
    end

    context 'with an invalid resize' do
      let(:resize) { :other }

      it 'raises an "ArgumentError" with an invalid resize' do
        expect { fetch }.to raise_error(ArgumentError, 'invalid option for resize: "other"')
      end
    end
  end
end
