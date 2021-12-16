module Sources
  class ActiveStorageHasManyAttached < ActiveStorageAttached
    def fetch(records)
      map = attachments(records: records)
        .group_by { |attachment| [attachment.record_type, attachment.record_id] }

      records.map { |record| map[[record.class.name, record.id]] || [] }
    end
  end
end
