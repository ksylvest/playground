module Sign
  class Request
    TEST_MODE = 1
    private_constant :TEST_MODE

    TERMS_OF_USE_TEMPLATE_ID = '693e40098f4c57bdc1bddaadb291437edbdac241'.freeze
    PRIVACY_POLICY_TEMPLATE_ID = '227b34c80f7a7b7510afd7845877974caa869846'.freeze
    private_constant :TERMS_OF_USE_TEMPLATE_ID
    private_constant :PRIVACY_POLICY_TEMPLATE_ID

    def initialize
      @client = HelloSign::Client.new
    end

    def urls
      embeded_sign_urls
    end

  private

    def custom_fields
      {
        name: 'Kevin Sylvestre',
        phone: '250-920-8282',
        email: 'kevin@clutter.com',
      }
    end

    def signer
      {
        email_address: 'kevin@clutter.com',
        name: 'Kevin Sylvestre',
        role: 'Customer',
      }
    end

    def embeded_signature_request
      @client.create_embedded_signature_request_with_template(
        test_mode: TEST_MODE,
        template_ids: [
          TERMS_OF_USE_TEMPLATE_ID,
          PRIVACY_POLICY_TEMPLATE_ID,
        ],
        message: 'Does this work?',
        custom_fields: custom_fields,
        signers: [signer]
      )
    end

    def embeded_sign_urls
      embeded_signature_request.signatures.map do |signature|
        HelloSign.get_embedded_sign_url(signature_id: signature.signature_id).sign_url
      end
    end
  end
end
