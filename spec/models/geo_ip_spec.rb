require 'rails_helper'

RSpec.describe GeoIP, type: :model do
  subject { build(:geo_ip) }

  it { should validate_presence_of(:ip) }
  it { should validate_uniqueness_of(:ip) }
end
