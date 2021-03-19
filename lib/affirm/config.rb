module Affirm
  class Config
    API_HOST = 'https://sandbox.affirm.com'
    API_PATH = '/api/v2'

    attr_accessor :public_api_key
    attr_accessor :private_api_key

    def http
      @http ||= HTTP
        .persistent(API_HOST)
        .basic_auth(user: public_api_key, pass: private_api_key)
    end
  end
end
