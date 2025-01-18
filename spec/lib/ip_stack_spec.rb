require "rails_helper"

RSpec.describe IPStack do
  let(:fake_access_key) { SecureRandom.alphanumeric }
  let(:ip) { "0.0.0.0" }

  describe ".fetch!" do
    subject :fetch! do
      allow(IPStack.config).to receive(:access_key) { fake_access_key }
      stub_request(:get, "http://api.ipstack.com/#{ip}?access_key=#{fake_access_key}")
        .to_return(status:, body:)
      IPStack.fetch!(ip:)
    end

    context "with a result" do
      let(:status) { 200 }
      let(:body) do
        <<~JSON
          {
            "ip": "0.0.0.0",
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

      it "fetches from the ipstack API" do
        expect(fetch!.ip).to eql(ip)
        expect(fetch!.city).to eql("Saratoga Springs")
        expect(fetch!.postal).to eql("12000")
        expect(fetch!.region.code).to eql("NY")
        expect(fetch!.region.name).to eql("New York")
        expect(fetch!.country.code).to eql("US")
        expect(fetch!.country.name).to eql("United States")
        expect(fetch!.continent.code).to eql("NA")
        expect(fetch!.continent.name).to eql("North America")
        expect(fetch!.latitude).to be(43.2)
        expect(fetch!.longitude).to be(-73.8)
      end
    end

    context "with a request error" do
      let(:status) { 200 }
      let(:body) do
        <<~JSON
          {
            "error": {
              "code": 0,
              "type": "unknown",
              "info": "Your API request volume has been reached. Please upgrade your plan."
            }
          }
        JSON
      end

      it "raises a request error" do
        expect { fetch! }
          .to raise_error(IPStack::API::RequestError)
      end
    end

    context "with a network error" do
      let(:status) { 500 }
      let(:body) { "" }

      it "raises a network error" do
        expect { fetch! }
          .to raise_error(IPStack::API::NetworkError)
      end
    end
  end
end
