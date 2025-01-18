require "rails_helper"

RSpec.describe Notification do
  subject { build(:notification) }

  it { is_expected.to belong_to(:user) }
  it { is_expected.to validate_presence_of(:message) }
end
