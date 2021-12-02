module Sources
  class HTTP < GraphQL::Dataloader::Source
    # @param host [String] i.e. https://example.com
    # @param size [Integer] the size of the pool used for fetching
    # @param timeout [Integer] a timeout for applied to the pool used for fetching
    def initialize(host:, size: 4, timeout: 4)
      super()
      @host = host
      @size = size
      @timeout = timeout
    end

    def fetch(procs)
      threads = procs.map do |proc|
        Thread.new do
          pool.with { |connection| proc.call(connection) }
        end
      end

      dataloader.yield

      threads.map(&:value)
    end

  private

    def pool
      @pool ||= ConnectionPool.new(size: @size, timeout: @timeout) do
        ::HTTP.persistent(@host)
      end
    end
  end
end
