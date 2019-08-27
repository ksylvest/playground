module Types
  class FeedType < GraphQL::Schema::Object
    field :entry, Types::Feed::EntryType, null: true do
      argument :id, ID, required: true
    end
    field :entries, [Types::Feed::EntryType], null: true

    def entry(id:)
      object.entries.find(id)
    end
  end
end
