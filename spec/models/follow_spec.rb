require 'rails_helper'

RSpec.describe Follow, type: :model do
  subject { build(:follow) }

  it { should belong_to(:followed) }
  it { should belong_to(:follower) }
end
