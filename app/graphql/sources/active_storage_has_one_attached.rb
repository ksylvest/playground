module Sources
  class ActiveStorageHasOneAttached < ActiveStorageAttached
    def fetch(records)
      attachments = attachments(records: records).load_async
      dataloader.yield

      map = attachments.index_by { |attachment| [attachment.record_type, attachment.record_id] }
      records.map { |record| map[[record.class.name, record.id]] }
    end
  end
end
