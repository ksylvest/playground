FactoryBot.define do
  factory :geo_ip, class: "GeoIP" do
    ip { "0.0.0.0" }
    city { "Saratoga Springs" }
    region { "New York" }
    country { "United States" }
    continent { "North America" }
    postal { "12000" }
    latitude { 43.2 }
    longitude { -73.8 }
  end
end
