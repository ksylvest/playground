require 'ipstack/api'
require 'ipstack/config'

module IPStack
  def self.config
    @config ||= IPStack::Config.new
  end

  def self.fetch!(ip:)
    IPStack::API.new(config: config).fetch!(ip: ip)
  end
end
