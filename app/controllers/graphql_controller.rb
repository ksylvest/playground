class GraphqlController < ApplicationController
  protect_from_forgery except: :execute

  def execute
    variables = params[:variables]
    query = params[:query]
    operation_name = params[:operationName]
    context = { authentication: }

    render json: AppSchema.execute(query, variables:, context:, operation_name:)
  end

private

  def authentication
    authenticate_with_http_token do |token, _|
      Authentication.active.find_by(token:)
    end
  end
end
