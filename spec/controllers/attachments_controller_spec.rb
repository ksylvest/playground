require "rails_helper"

RSpec.describe AttachmentsController, type: :request do
  let(:user) { create(:user, :with_avatar) }

  describe "GET #show" do
    let(:w) { 8 }
    let(:h) { 8 }
    let(:format) { :jpeg }
    let(:resize) { :fill }

    it "responds with the variant" do
      get attachment_path(user.avatar.id), params: { w:, h:, format:, resize: }
      expect(response).to have_http_status(:found)
    end
  end
end
