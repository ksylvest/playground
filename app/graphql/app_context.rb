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
end
