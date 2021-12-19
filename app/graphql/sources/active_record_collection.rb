module Sources
  class ActiveRecordCollection < ActiveRecordBase
    def fetch(keys)
      models = models(keys: keys).order(:id).load_async
      dataloader.yield

      map = models.group_by { |model| model[@key] }
      keys.map { |key| map[key] || [] }
    end
  end
end
