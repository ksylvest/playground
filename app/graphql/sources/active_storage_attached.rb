module Sources
  class ActiveStorageAttached < GraphQL::Dataloader::Source
    # @param name [String] the association name
    def initialize(name)
      super()
      @name = name
    end

  protected

    # @param records [Array<ActiveRecord::Base>] a collection of records to load attachments for
    # @return [Array<ActiveStorage::Attachment>] the associated attachments with preloaded blobs
    def attachments(records:)
      ActiveStorage::Attachment
        .preload(:blob)
        .where(record: records)
        .where(name: @name)
        .order(:id)
    end
  end
end
