class Hook::EventsController < ApplicationController
  wrap_parameters :name

  # POST /hook/providers/:slug/events
  def create
    provider = Hook::Provider.find_by(slug: params[:provider_slug])

    if provider&.authenticate_token(params[:token])
      process!(provider: provider)
      head(:ok)
    else
      head(:unauthorized)
    end
  end

private

  def process!(provider:)
    case provider.slug
    when 'slack'
      # assumes slack webhook comes with a 'name' param that is important
      event = provider.events.create!(data: params.permit(:name))
      Hook::ProcessSlackJob.perform_later(event)
    when 'stripe'
      # assumes stripe webhook comes with a 'object' param that is important
      event = provider.events.create!(data: params.permit(:object))
      Hook::ProcessStripeJob.perform_later(event)
    end
  end
end
