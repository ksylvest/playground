class AppContext < GraphQL::Query::Context
  def authed?
    !!authentication
  end

  def authentication
    self[:authentication]
  end

  def user
    authentication&.user
  end

  def user!
    user || raise(GraphQL::ExecutionError.new("Unauthorized", extensions: { code: "UNAUTHORIZED" }))
  end

  # @usage
  #   context.authorize!(user, :view)
  def pundit_authorize!(record, permission)
    Pundit.authorize!(user!, record, permission)
  end

  # @usage
  #   context.scope!(User.all)
  def pundit_policy_scope!(records)
    Pundit.policy_scope!(user!, records)
  end
end
