module Sources
  class ActiveRecordObject < ActiveRecordBase
    def fetch(keys)
      models = models(keys: keys).order(:id).load_async
      dataloader.yield

      map = models.index_by { |model| model[@key] }
      keys.map { |key| map[key] }
    end
  end
end
