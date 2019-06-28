class GraphqlController < ApplicationController
  protect_from_forgery except: :execute

  def execute
    render json: result
  end

private

  def result
    AppSchema.execute(params[:query], variables: params[:variables])
  end
end
