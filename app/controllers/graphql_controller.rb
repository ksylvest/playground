class GraphqlController < ApplicationController
  protect_from_forgery except: :execute

  def execute
    render json: result
  end

private

  def result
    context = { cookies: cookies }
    query = params[:query]
    variables = params[:variables]
    AppSchema.execute(query, variables: variables, context: context)
  end
end
