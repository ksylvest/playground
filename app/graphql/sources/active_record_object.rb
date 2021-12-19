module Sources
  class ActiveRecordObject < ActiveRecordBase
    def fetch(keys)
      results = models(keys: keys).index_by { |model| model[@key] }
      keys.map { |key| results[key] }
    end
  end
end
