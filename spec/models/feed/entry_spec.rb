require "rails_helper"

RSpec.describe Feed::Entry do
  subject { build(:feed_entry) }

  it { is_expected.to belong_to(:user) }
end
