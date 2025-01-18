require "rails_helper"

RSpec.describe Feed::Like do
  subject { build(:feed_like) }

  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:entry) }
end
