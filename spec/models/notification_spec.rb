require 'rails_helper'

RSpec.describe Notification do
  subject { build(:notification) }

  it { should belong_to(:user) }
  it { should validate_presence_of(:message) }
end
