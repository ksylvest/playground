module Sources
  class ActiveStorageAttachment < GraphQL::Dataloader::Source
    def initialize(name, kind: :attachment)
      super()
      @name = name
      @kind = kind
    end

  private

    def fetch(records)
      ::ActiveRecord::Associations::Preloader.new.preload(records, { "#{@name}_#{@kind}": :blob })
      records.map { |record| record.send(@name) }
    end
  end
end
