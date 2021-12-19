module Sources
  class ActiveRecordCount < ActiveRecordBase
    def fetch(keys)
      results = models(keys: keys).group(@key).count
      keys.map { |key| results[key] || 0 }
    end
  end
end
