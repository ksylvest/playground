require 'rails_helper'

RSpec.describe Employee, type: :model do
  subject { Fabricate.build(:employee) }
  it { should belong_to(:company) }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email) }
end
