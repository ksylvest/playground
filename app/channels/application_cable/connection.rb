module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :user

    def connect
      Current.cookies = cookies
      self.user = Current.user
      reject_unauthorized_connection unless user
    end
  end
end
