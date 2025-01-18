module Mutations
  module Authentication
    class DestroyMutation < BaseMutation
      graphql_name "DestroyAuthentication"
      argument :id, ::String, required: true
      field :authentication, ::Types::AuthenticationType, null: false

      def resolve(id:)
        authentication = context.user!.authentications.find_by(id:)
        authentication.clear!

        { authentication: }
      end
    end
  end
end
