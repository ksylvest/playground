module Loaders
  class CounterLoader < GraphQL::Batch::Loader
    def initialize(model, key:)
      super()
      @model = model
      @key = key
    end

  private

    def perform(ids)
      counts(ids).each { |(id, count)| fulfill(id, count) }
      ids.each { |id| fulfill(id, 0) unless fulfilled?(id) }
    end

    def counts(ids)
      @model.where(@key => ids).group(@key).count
    end
  end
end
