module Sources
  class Cache < GraphQL::Dataloader::Source
    def fetch(operations)
      keys = operations.map { |operation| operation[:key] }
      procs = Hash[operations.map { |operation| [operation[:key], operation[:value]] }]
      results = Rails.cache.fetch_multi(*keys) { |key| procs[key].call }
      operations.map { |operation| results[operation[:key]] }
    end
  end
end
