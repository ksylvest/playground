module IPStack
  # @return [IPStack::Config]
  def self.config
    @config ||= IPStack::Config.new
  end

  # @yield [config]
  # @yieldparam config [IPStack::Config]
  def self.configure
    yield(config)
  end

  # @param ip [String]
  # @return [IPStack::Response]
  def self.fetch!(ip:)
    IPStack::API.new(config:).fetch!(ip:)
  end
end
