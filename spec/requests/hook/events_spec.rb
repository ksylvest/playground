require 'rails_helper'

RSpec.describe "Hook::Events", type: :request do
  let(:provider) { create(:hook_provider, slug: 'slack', token: 'abcdef') }

  describe "POST /create" do
    context 'with a blank token' do
      it 'responds unauthorized' do
        post hook_provider_event_path(provider_slug: provider.slug)
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'with a fake token' do
      it 'responds unauthorized' do
        post hook_provider_event_path(provider_slug: provider.slug, token: 'FEDBCA')
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'with a valid token' do
      it 'responds ok' do
        post hook_provider_event_path(provider_slug: provider.slug, token: 'abcdef', name: 'message:posted')
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
