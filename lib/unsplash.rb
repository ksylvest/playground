module Unsplash
  # @return [Unsplash::Config]
  def self.config
    @config ||= Unsplash::Config.new
  end

  # @yield [Unsplash::Config]
  def self.configure
    yield(config)
  end

  # @return [Unsplash::API]
  def self.api
    Unsplash::API.new(config:)
  end
end
