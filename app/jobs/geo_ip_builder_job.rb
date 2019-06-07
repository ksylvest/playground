class GeoIPBuilderJob < ApplicationJob
  queue_as :default

  def perform(ip)
    return if ip.eql?('0.0.0.0')
    return if IPAddr.new(ip).loopback?
    return if GeoIP.exists?(ip: ip)

    geo_ip = parse(ip: ip, result: IPStack.fetch!(ip: ip))
    geo_ip.save!
  end

private

  def parse(ip:, result:)
    geo_ip = GeoIP.new(ip: ip)
    geo_ip.city = result.city
    geo_ip.region = result.region.name
    geo_ip.country = result.country.name
    geo_ip.continent = result.continent.name
    geo_ip.zip = result.zip
    geo_ip.latitude = result.latitude
    geo_ip.longitude = result.longitude
    geo_ip
  end
end
