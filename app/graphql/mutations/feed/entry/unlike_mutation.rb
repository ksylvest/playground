module Mutations
  module Feed
    module Entry
      class UnlikeMutation < GraphQL::Schema::Mutation
        graphql_name 'UnlikeFeedEntry'
        argument :id, ID, required: true
        field :entry, ::Types::Feed::EntryType, null: false

        def resolve(id:)
          entry = ::Feed::Entry.find(id)
          like = ::Feed::Like.find_by(user: Current.user, entry: entry)
          like&.destroy
          { entry: entry }
        end
      end
    end
  end
end
