module Types
  class MutationType < BaseObject
    field :login, mutation: ::Mutations::LoginMutation
    field :logout, mutation: ::Mutations::LogoutMutation
    field :signup, mutation: ::Mutations::SignupMutation

    field :destroy_session, mutation: ::Mutations::Session::DestroyMutation

    field :destroy_notification, mutation: ::Mutations::Notification::DestroyMutation
    field :read_notification, mutation: ::Mutations::Notification::ReadMutation

    field :change_password, mutation: ::Mutations::Password::ChangeMutation

    field :change_profile, mutation: ::Mutations::Profile::ChangeMutation

    field :attach_avatar, mutation: ::Mutations::Avatar::AttachMutation
    field :detach_avatar, mutation: ::Mutations::Avatar::DetachMutation

    field :build_billing_source, mutation: ::Mutations::Billing::Source::BuildMutation
    field :destroy_billing_source, mutation: ::Mutations::Billing::Source::DestroyMutation
    field :default_billing_source, mutation: ::Mutations::Billing::Source::DefaultMutation

    field :build_feed_comment, mutation: ::Mutations::Feed::Comment::BuildMutation
    field :like_feed_entry, mutation: ::Mutations::Feed::Entry::LikeMutation
    field :unlike_feed_entry, mutation: ::Mutations::Feed::Entry::UnlikeMutation

    field :follow_user, mutation: ::Mutations::User::FollowMutation
    field :unfollow_user, mutation: ::Mutations::User::UnfollowMutation
  end
end
