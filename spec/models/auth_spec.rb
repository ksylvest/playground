require 'rails_helper'

RSpec.describe Auth, type: :model do
  let(:user) { create(:user) }

  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password) }
  it { should_not allow_value('kevin').for(:email) }
  it { should_not allow_value('@host.com').for(:email) }
  it { should allow_value('kevin@host.com').for(:email) }

  describe '#authenticate' do
    it 'authenticates with valid credentials' do
      auth = Auth.new(email: user.email, password: user.password)
      auth.authenticate
      expect(auth.authenticate).to eq(user)
    end

    it 'does not authenticate with invalid credentials' do
      auth = Auth.new(email: user.email, password: 'hacker')
      auth.authenticate
      expect(auth.authenticate).to_not eq(user)
    end
  end
end
