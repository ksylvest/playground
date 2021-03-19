require 'affirm/charge'
require 'affirm/checkout'
require 'affirm/config'

module Affirm
  def self.config
    @config ||= Affirm::Config.new
  end
end
