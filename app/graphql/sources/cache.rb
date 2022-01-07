module Sources
  class Cache < GraphQL::Dataloader::Source
    def fetch(operations)
      keys = operations.pluck(:key)
      procs = operations.to_h { |operation| [operation[:key], operation[:value]] }
      results = Rails.cache.fetch_multi(*keys) { |key| procs[key].call }
      operations.map { |operation| results[operation[:key]] }
    end
  end
end
