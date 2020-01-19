module Billing
  module Interfaces
    module MutationInterface
      include GraphQL::Schema::Interface

      field :build_billing_source, mutation: ::Billing::Mutations::Source::BuildMutation
      field :destroy_billing_source, mutation: ::Billing::Mutations::Source::DestroyMutation
      field :default_billing_source, mutation: ::Billing::Mutations::Source::DefaultMutation
    end
  end
end
