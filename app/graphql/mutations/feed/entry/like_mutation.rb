module Mutations
  module Feed
    module Entry
      class LikeMutation < BaseMutation
        graphql_name "LikeFeedEntry"
        argument :id, ID, required: true
        field :entry, ::Types::Feed::EntryType, null: false

        def resolve(id:)
          entry = ::Feed::Entry.find(id)
          like = ::Feed::Like.find_or_initialize_by(user: context.user!, entry:)
          like.save!
          { entry: }
        end
      end
    end
  end
end
