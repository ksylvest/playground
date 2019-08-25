require 'rails_helper'

RSpec.describe Feed::Entry, type: :model do
  subject { build(:feed_entry) }

  it { should belong_to(:user) }
end
