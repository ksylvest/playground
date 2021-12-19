module Sources
  class ActiveRecordCount < ActiveRecordBase
    def fetch(keys)
      map = models(keys: keys).group(@key).count
      keys.map { |key| map[key] || 0 }
    end
  end
end
