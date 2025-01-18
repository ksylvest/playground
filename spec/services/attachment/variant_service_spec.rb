require "rails_helper"

RSpec.describe Attachment::VariantService, type: :service do
  let(:user) { create(:user, :with_avatar) }
  let(:attachment) { user.avatar }
  let(:resize) { "fill" }
  let(:format) { "jpeg" }

  let(:variant) do
    Attachment::VariantService.variant(
      attachment,
      format:,
      resize:,
      size: [
        64,
        64,
      ]
    )
  end

  describe ".variant" do
    it { expect(variant).to be_a(ActiveStorage::VariantWithRecord) }

    context 'when "resize" is "other"' do
      let(:resize) { "other" }

      it 'raises an "ArgumentError"' do
        expect { variant }.to raise_error(ArgumentError, 'invalid option for resize: "other"')
      end
    end

    context 'with "convert" is "gif"' do
      let(:format) { "gif" }

      it 'raises an "ArgumentError"' do
        expect { variant }.to raise_error(ArgumentError, 'invalid option for format: "gif"')
      end
    end
  end
end
