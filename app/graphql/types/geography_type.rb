module Types
  class GeographyType < BaseObject
    field :id, ID, null: false
    field :city, String, null: false
    field :region, String, null: false
    field :country, String, null: false
    field :continent, String, null: false
    field :postal, String, null: false
    field :latitude, Float, null: false
    field :longitude, Float, null: false
  end
end
