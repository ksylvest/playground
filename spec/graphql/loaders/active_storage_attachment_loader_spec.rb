require 'rails_helper'

RSpec.describe Loaders::ActiveStorageAttachmentLoader do
  describe '#load' do
    let(:user) { create(:user, :with_avatar) }

    it 'loads an attachment' do
      avatar = GraphQL::Batch.batch do
        Loaders::ActiveStorageAttachmentLoader
          .for(:avatar, kind: :attachment)
          .load(user)
      end
      expect(avatar).to be_present
    end
  end
end
