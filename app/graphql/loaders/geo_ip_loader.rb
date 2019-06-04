module Loaders
  class GeoIPLoader < GraphQL::Batch::Loader
    def perform(ips)
      GeoIP.where(ip: ips).each { |geo_ip| fulfill(geo_ip.ip, geo_ip) }
      ips.each { |ip| fulfill(ip, nil) unless fulfilled?(ip) }
    end
  end
end
