module Loaders
  class AssociationLoader < GraphQL::Batch::Loader
    def initialize(name)
      super()
      @name = name
    end

    def perform(records)
      ::ActiveRecord::Associations::Preloader.new.preload(records, @name)
      records.each do |record|
        fulfill(record, record.association(@name).target)
      end
    end
  end
end
