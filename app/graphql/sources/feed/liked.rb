module Sources
  module Feed
    class Liked < GraphQL::Dataloader::Source
      def initialize(user)
        super()
        @user = user
      end

      def fetch(entries)
        entry_ids = Set.new(::Feed::Like.where(user: @user, entry: entries).pluck(:entry_id))
        entries.map { |entry| entry_ids.member?(entry.id) }
      end
    end
  end
end
