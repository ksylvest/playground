module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :session

    def connect
      Current.cookies = cookies
      self.session = Current.session
      reject_unauthorized_connection unless session
    end
  end
end
