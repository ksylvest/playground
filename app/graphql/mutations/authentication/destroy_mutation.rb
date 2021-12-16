module Mutations
  module Authentication
    class DestroyMutation < BaseMutation
      graphql_name 'DestroyAuthentication'
      argument :id, ::String, required: true
      field :authentication, ::Types::AuthenticationType, null: false

      def resolve(id:)
        authentication = Current.user.authentications.find_by(id: id)
        authentication.clear!

        { authentication: authentication }
      end
    end
  end
end
