module Types
  class FeedType < GraphQL::Schema::Object
    field :entries, [Types::Feed::EntryType], null: true
  end
end
