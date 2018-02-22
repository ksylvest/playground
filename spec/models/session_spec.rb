require 'rails_helper'

RSpec.describe Session, type: :model do
  it { should belong_to(:user) }
  it { should validate_presence_of(:ip) }

  let(:decoded) { 'playground' }
  let(:encoded) { 'eyJhbGciOiJIUzI1NiJ9.InBsYXlncm91bmQi.H916pBgE1ixEYfvdlyWI0jDUofbsVHU7kcUObVhgodU' }

  describe '.encode' do
    it 'encodes the decoded' do
      expect(Session.encode(decoded)).to eql(encoded)
    end
  end

  describe '.decode' do
    it 'decodes the encoded' do
      expect(Session.decode(encoded)).to eql(decoded)
    end
  end
end
