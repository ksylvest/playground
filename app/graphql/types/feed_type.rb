module Types
  class FeedType < BaseObject
    field :entry, Types::Feed::EntryType, null: false do
      argument :id, ID, required: true
    end
    field :entries, [Types::Feed::EntryType], null: false

    def entry(id:)
      object.entries.find(id)
    end
  end
end
