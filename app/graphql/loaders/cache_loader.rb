module Loaders
  class CacheLoader < GraphQL::Batch::Loader
    def perform(operations)
      results = fetch(operations)
      operations.each { |operation| fulfill(operation, results[operation[:key]]) }
    end

  private

    def fetch(operations)
      keys = operations.map { |operation| operation[:key] }
      procs = Hash[operations.map { |operation| [operation[:key], operation[:value]] }]
      Rails.cache.fetch_multi(*keys) do |key|
        procs[key].call
      end
    end
  end
end
