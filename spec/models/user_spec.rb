require 'rails_helper'

RSpec.describe User, type: :model do
  subject { Fabricate.build(:user) }

  it { should have_many(:sessions) }
  it { should have_many(:notifications) }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email).ignoring_case_sensitivity }
  it { should_not allow_value('kevin').for(:email) }
  it { should_not allow_value('@host.com').for(:email) }
  it { should allow_value('kevin@host.com').for(:email) }

  describe '.system' do
    it 'finds a system user if exists' do
      user = Fabricate(:user, email: 'system@playground.dev')
      expect(User.system).to eql(user)
    end

    it 'initializes a system user otherwise' do
      expect(User.system).to be_kind_of(User)
    end
  end
end
