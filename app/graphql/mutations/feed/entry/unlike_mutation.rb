module Mutations
  module Feed
    module Entry
      class UnlikeMutation < BaseMutation
        graphql_name "UnlikeFeedEntry"
        argument :id, ID, required: true
        field :entry, ::Types::Feed::EntryType, null: false

        def resolve(id:)
          entry = ::Feed::Entry.find(id)
          like = ::Feed::Like.find_by(user: context.user!, entry:)
          like&.destroy
          { entry: }
        end
      end
    end
  end
end
