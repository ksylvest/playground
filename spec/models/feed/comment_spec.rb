require 'rails_helper'

RSpec.describe Feed::Comment, type: :model do
  subject { build(:feed_comment) }

  it { should belong_to(:user) }
  it { should belong_to(:entry) }

  it { should validate_presence_of(:message) }
end
