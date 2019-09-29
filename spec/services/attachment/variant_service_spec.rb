require 'rails_helper'

RSpec.describe Attachment::VariantService, type: :service do
  let(:user) { create(:user, :with_avatar) }
  let(:attachment) { user.avatar }
  let(:resize) { 'fit' }
  let(:format) { 'jpg' }
  let(:service) do
    Attachment::VariantService.new(
      attachment: attachment,
      format: format,
      resize: resize,
      size: [
        64,
        64,
      ]
    )
  end

  describe '#variant' do
    subject(:variant) { service.variant }

    it 'generates a variant for an attachment' do
      expect(service.variant).to be_kind_of(ActiveStorage::Variant)
    end

    context 'when "resize" is "other"' do
      let(:resize) { 'other' }

      it 'raises an "ArgumentError"' do
        expect { variant }.to raise_error(ArgumentError, 'invalid option for resize: "other"')
      end
    end

    context 'with "convert" is "gif"' do
      let(:format) { 'gif' }

      it 'raises an "ArgumentError"' do
        expect { variant }.to raise_error(ArgumentError, 'invalid option for format: "gif"')
      end
    end
  end
end
