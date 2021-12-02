module Sources
  class Counter < GraphQL::Dataloader::Source
    def initialize(model, key:)
      super()
      @model = model
      @key = key
    end

    def fetch(ids)
      results = @model.where(@key => ids).group(@key).count
      ids.map { |id| results[id] || 0 }
    end
  end
end
