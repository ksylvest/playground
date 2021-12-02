module Sources
  class Records < GraphQL::Dataloader::Source
    def initialize(model, key:)
      super()
      @model = model
      @key = key
    end

    def fetch(keys)
      results = @model.where(@key => keys).group_by { |model| model[@key] }
      keys.map { |key| results[key] || [] }
    end
  end
end
