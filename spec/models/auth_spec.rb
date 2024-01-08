require 'rails_helper'

RSpec.describe Auth do
  let(:user) { create(:user) }

  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password) }

  describe '#user' do
    it 'authenticates with valid credentials' do
      auth = Auth.new(email: user.email, password: user.password)
      expect(auth.user).to eq(user)
    end

    it 'does not authenticate with invalid credentials' do
      auth = Auth.new(email: user.email, password: 'hacker')
      expect(auth.user).to be_nil
    end
  end
end
