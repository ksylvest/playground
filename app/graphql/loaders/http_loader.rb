module Loaders
  class HTTPLoader < GraphQL::Batch::Loader
    # @param host [String] i.e. https://example.com
    # @param size [Integer] the size of the pool used for fetching.
    # @param timeout [Integer] a timeout for applied to the pool used for fetching.
    def initialize(host:, size: 4, timeout: 4)
      super()
      @host = host
      @size = size
      @timeout = timeout
    end

    def perform(procs)
      futures = procs.map do |proc|
        Concurrent::Promises.future do
          pool.with { |connection| proc.call(connection) }
        end
      end
      procs.each_with_index.each do |proc, index|
        fulfill(proc, futures[index].value)
      end
    end

  private

    def pool
      @pool ||= ConnectionPool.new(size: @size, timeout: @timeout) do
        HTTP.persistent(@host)
      end
    end
  end
end
