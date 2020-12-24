module Loaders
  module Feed
    class LikedLoader < GraphQL::Batch::Loader
      def initialize(user)
        super()
        @user = user
      end

      def perform(entries)
        entry_ids = Set.new(::Feed::Like.where(user: @user, entry: entries).pluck(:entry_id))
        entries.each do |entry|
          fulfill(entry, entry_ids.member?(entry.id))
        end
      end
    end
  end
end
