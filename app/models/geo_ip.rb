class GeoIP < ApplicationRecord
  validates :ip, presence: true, uniqueness: true
  validates :city, presence: true
  validates :region, presence: true
  validates :country, presence: true
  validates :continent, presence: true
  validates :zip, presence: true
  validates :latitude, presence: true, inclusion: { in: -90.0..+90.0 }
  validates :longitude, presence: true, inclusion: { in: -180.0..+180.0 }
end
