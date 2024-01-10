module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :authentication

    def connect
      token = request.params[:token]
      self.authentication = token && Authentication.find_by(token:)
      reject_unauthorized_connection unless authentication
    end
  end
end
