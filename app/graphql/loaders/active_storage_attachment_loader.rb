module Loaders
  class ActiveStorageAttachmentLoader < GraphQL::Batch::Loader
    def initialize(name, kind: :attachment)
      @name = name
      @kind = kind
    end

  private

    def perform(records)
      preloads = { "#{@name}_#{@kind}": :blob }
      ::ActiveRecord::Associations::Preloader.new.preload(records, preloads)
      records.each do |record|
        fulfill(record, record.send(@name))
      end
    end
  end
end
