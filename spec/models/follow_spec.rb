require "rails_helper"

RSpec.describe Follow do
  subject { build(:follow) }

  it { is_expected.to belong_to(:followed) }
  it { is_expected.to belong_to(:follower) }
end
