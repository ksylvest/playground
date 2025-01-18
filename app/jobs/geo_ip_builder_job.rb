class GeoIPBuilderJob < ApplicationJob
  queue_as :default

  def perform(ip)
    return if ip.eql?("0.0.0.0")
    return if IPAddr.new(ip).loopback?
    return if GeoIP.exists?(ip:)

    geo_ip = parse(ip:, result: IPStack.fetch!(ip:))
    geo_ip.save!
  end

private

  def parse(ip:, result:)
    geo_ip = GeoIP.new(ip:)
    geo_ip.attributes = {
      city: result.city,
      region: result.region.name,
      country: result.country.name,
      continent: result.continent.name,
      postal: result.postal,
      latitude: result.latitude,
      longitude: result.longitude,
    }
    geo_ip
  end
end
