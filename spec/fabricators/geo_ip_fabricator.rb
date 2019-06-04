Fabricator(:geo_ip, from: 'GeoIP') do
  ip '0.0.0.0'
  city 'Saratoga Springs'
  region 'New York'
  country 'United States'
  continent 'North America'
  zip '12000'
  latitude { 43.2 }
  longitude { -73.8 }
end
