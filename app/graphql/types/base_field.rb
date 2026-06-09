module Types
  class BaseField < GraphQL::Schema::Field
    argument_class Types::BaseArgument

    # @return [Symbol, nil] a permission for usage with Pundit
    attr_accessor :pundit_authorize

    # @return [Boolean, nil] an optional indication if the field should be scoped by Pundit
    attr_accessor :pundit_policy_scope

    # @usage
    #
    #   field :users, [UserType], null: false, authorization: { comment: "manually scoped within the resolver" }
    #
    # @usage
    #   field :users, [UserType], null: false, authorization: :scope
    #
    # @usage
    #   field :user, [UserType], null: false, authorization: { action: :view } do
    #     argument :id, ID, required: true
    #   end
    #
    # @param pundit_authorize [Symbol] a permission for usage with Pundit
    # @param pundit_policy_scope [Boolean, nil] an optional indication if the field should be scoped by Pundit
    def initialize(*, pundit_authorize: nil, pundit_policy_scope: nil, **, &)
      @pundit_authorize = pundit_authorize
      @pundit_policy_scope = pundit_policy_scope
      super(*, **, &)
    end

    def resolve(object, arguments, context)
      result = super

      result = context.pundit_authorize!(result, @pundit_authorize) if @pundit_authorize
      result = context.pundit_policy_scope!(result) if @pundit_policy_scope
      result
    end
  end
end
