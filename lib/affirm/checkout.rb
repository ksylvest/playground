module Affirm
  class Checkout
    def self.retrieve(token)
      Affirm.config.http.get("#{Config::API_PATH}/checkout/#{token}")
    end
  end
end
