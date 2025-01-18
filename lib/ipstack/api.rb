module IPStack
  Location = Struct.new(:code, :name)
  Response = Struct.new(:ip, :city, :postal, :latitude, :longitude, :continent, :country, :region)

  class API
    HOST = "http://api.ipstack.com".freeze
    TIMEOUT = 5 # seconds
    private_constant :HOST
    private_constant :TIMEOUT

    class NetworkError < StandardError; end

    class RequestError < StandardError; end

    def initialize(config:)
      @config = config
    end

    def fetch!(ip:)
      response = client.get("#{HOST}/#{ip}", params: { access_key: @config.access_key })
      raise NetworkError, response unless response.status.success?

      data = JSON.parse(response)
      raise RequestError, data["error"]["info"] if data["error"]

      parse(data)
    end

  private

    def client
      HTTP.timeout(TIMEOUT)
    end

    def parse(data)
      Response.new(
        data["ip"],
        data["city"],
        data["zip"],
        data["latitude"],
        data["longitude"],
        Location.new(data["continent_code"], data["continent_name"]),
        Location.new(data["country_code"], data["country_name"]),
        Location.new(data["region_code"], data["region_name"])
      )
    end
  end
end
