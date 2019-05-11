module Types
  class QueryType < GraphQL::Schema::Object
    field :user, UserType, null: true
    field :sessions, [SessionType], null: false

    def user
      Current.user
    end

    def sessions
      Current.user.sessions
    end
  end
end
