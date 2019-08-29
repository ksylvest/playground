class Twilio::VoicesController < ApplicationController
  # GET /twilio/voice?dial=:dial
  def show
    twiml = Twilio::TwiML::VoiceResponse.new do |response|
      response.dial(record: 'record-from-ringing-dual', number: params.require(:dial))
    end
    render xml: twiml.to_xml
  end
end
