require "rails_helper"

RSpec.describe GeoIP do
  subject { build(:geo_ip) }

  it { is_expected.to validate_presence_of(:ip) }
  it { is_expected.to validate_uniqueness_of(:ip) }
end
