require 'rails_helper'

RSpec.describe Feed::Like, type: :model do
  subject { build(:feed_like) }

  it { should belong_to(:user) }
  it { should belong_to(:entry) }
end
