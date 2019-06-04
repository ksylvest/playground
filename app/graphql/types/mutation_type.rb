module Types
  class MutationType < GraphQL::Schema::Object
    field :login, mutation: ::Mutations::LoginMutation
    field :logout, mutation: ::Mutations::LogoutMutation
    field :signup, mutation: ::Mutations::SignupMutation

    field :destroy_session, mutation: ::Mutations::Session::DestroyMutation
  end
end
