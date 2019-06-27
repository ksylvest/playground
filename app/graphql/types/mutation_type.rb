module Types
  class MutationType < GraphQL::Schema::Object
    field :login, mutation: ::Mutations::LoginMutation
    field :logout, mutation: ::Mutations::LogoutMutation
    field :signup, mutation: ::Mutations::SignupMutation

    field :destroy_session, mutation: ::Mutations::Session::DestroyMutation

    field :destroy_notification, mutation: ::Mutations::Notification::DestroyMutation
    field :read_notification, mutation: ::Mutations::Notification::ReadMutation

    field :change_profile, mutation: ::Mutations::Profile::ChangeMutation

    field :attach_avatar, mutation: ::Mutations::Avatar::AttachMutation
    field :detach_avatar, mutation: ::Mutations::Avatar::DetachMutation
  end
end
