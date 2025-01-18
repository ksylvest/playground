module Unsplash
  class API
    class FetchError < StandardError
      def initialize(response)
        super("#{response.status} #{response.body}")
      end
    end

    # @param config [Unsplash::Config]
    def initialize(config:)
      @config = config
    end

    # @raise [FetchError]
    # @param id [String]
    # @return [Hash]
    def photo(id:)
      response = client.get("/photos/#{id}")
      raise FetchError, response unless response.status.ok?

      response.parse
    end

  private

    # @return [HTTP::Client]
    def client
      HTTP
        .auth("Client-ID #{@config.access_key}")
        .persistent("https://api.unsplash.com")
    end
  end
end
