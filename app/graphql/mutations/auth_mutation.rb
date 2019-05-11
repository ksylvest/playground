module Mutations
  class AuthMutation < GraphQL::Schema::Mutation
    def auth!(user)
      cookies = context[:cookies]
      session = user.sessions.build
      session.save!
      Current.session = session
      cookies.encrypted.permanent[:session_id] = session.id
    end

    def deauth!
      cookies = context[:cookies]
      Current.session&.touch(:deleted_at)
      cookies.delete(:session_id)
    end
  end
end
