module Billing
  module Interfaces
    module QueryInterface
      include GraphQL::Schema::Interface

      field :billing, ::Billing::Types::ContextType, null: false

      def billing
        ::Billing::Context.new(user: Current.user)
      end
    end
  end
end
