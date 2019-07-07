class MainController < ApplicationController
  per_request_react_rails_prerenderer

  def index
    render component: 'App', props: {
      location: request.path,
      session: Current.session&.slice(:id),
    }
  end
end
