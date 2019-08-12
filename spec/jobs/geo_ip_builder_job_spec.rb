require 'rails_helper'

RSpec.describe GeoIPBuilderJob, type: :job do
  let(:ip) { '4.4.4.4' }

  describe '#perform' do
    subject :perform do
      stub_request(:get, "http://api.ipstack.com/#{ip}?access_key=#{IPStack.config.access_key}")
        .to_return(status: status, body: body)
      GeoIPBuilderJob.new.perform(ip)
    end

    let(:status) { 200 }
    let(:body) do
      <<~JSON
        {
          "ip": "4.4.4.4",
          "continent_code": "NA",
          "continent_name": "North America",
          "country_code": "US",
          "country_name": "United States",
          "region_code": "NY",
          "region_name": "New York",
          "city": "Saratoga Springs",
          "zip": "12000",
          "latitude": 43.2,
          "longitude": -73.8,
          "connection": { "asn": "" }
        }
      JSON
    end

    it 'builds a geo IP entry' do
      expect { perform }
        .to change { GeoIP.where(ip: ip, latitude: 43.2, longitude: -73.8, zip: '12000').count }
    end
  end
end
