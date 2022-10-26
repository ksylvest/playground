require 'rails_helper'

RSpec.describe Follow do
  subject { build(:follow) }

  it { should belong_to(:followed) }
  it { should belong_to(:follower) }
end
