module Affirm
  class Charge
    def self.authorize(checkout)
      Affirm.config.http.post("#{Config::API_PATH}/checkout", params: { checkout_token: checkout.token })
    end
  end
end
