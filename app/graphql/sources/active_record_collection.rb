module Sources
  class ActiveRecordCollection < ActiveRecordBase
    def fetch(keys)
      results = models(keys: keys).group_by { |model| model[@key] }
      keys.map { |key| results[key] || [] }
    end
  end
end
