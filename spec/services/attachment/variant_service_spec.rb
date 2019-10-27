require 'rails_helper'

RSpec.describe Attachment::VariantService, type: :service do
  let(:user) { create(:user, :with_avatar) }
  let(:attachment) { user.avatar }
  let(:resize) { 'fill' }
  let(:format) { 'webp' }
  let(:service) do
    Attachment::VariantService.new(
      attachment,
      format: format,
      resize: resize,
      size: [
        64,
        64,
      ]
    )
  end

  describe '#initialize' do
    context 'when "resize" is "other"' do
      let(:resize) { 'other' }

      it 'raises an "ArgumentError"' do
        expect { service }.to raise_error(ArgumentError, 'invalid option for resize: "other"')
      end
    end

    context 'with "convert" is "gif"' do
      let(:format) { 'gif' }

      it 'raises an "ArgumentError"' do
        expect { service }.to raise_error(ArgumentError, 'invalid option for format: "gif"')
      end
    end
  end

  describe '#variant' do
    subject(:variant) { service.variant }

    it 'generates a variant for an attachment' do
      expect(service.variant).to be_kind_of(ActiveStorage::Variant)
    end
  end

  describe '#data' do
    subject(:data) { service.data }

    it 'generates data for an attachment' do
      expect(service.data).to be_kind_of(String)
    end
  end

  describe '#type' do
    subject(:type) { service.type }

    it 'uses the format to generate a type' do
      expect(service.type).to be_kind_of(Mime::Type)
    end
  end
end
