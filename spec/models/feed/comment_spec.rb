require "rails_helper"

RSpec.describe Feed::Comment do
  subject { build(:feed_comment) }

  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:entry) }

  it { is_expected.to validate_presence_of(:message) }
end
