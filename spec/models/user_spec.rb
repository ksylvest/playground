require "rails_helper"

RSpec.describe User do
  subject { build(:user) }

  it { is_expected.to have_many(:authentications) }
  it { is_expected.to have_many(:notifications) }
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_uniqueness_of(:email).ignoring_case_sensitivity }
  it { is_expected.not_to allow_value("kevin").for(:email) }
  it { is_expected.not_to allow_value("@host.com").for(:email) }
  it { is_expected.to allow_value("kevin@host.com").for(:email) }

  describe ".system" do
    it "finds a system user if exists" do
      user = create(:user, email: "system@playground.dev")
      expect(User.system).to eql(user)
    end

    it "initializes a system user otherwise" do
      expect(User.system).to be_a(User)
    end
  end
end
