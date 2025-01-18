class Feed::Context
  attr_accessor :entries

  def initialize(user: nil)
    @user = user
    @entries = Feed::Entry.for(user:)
  end

  def id
    @user ? @user.id : "default"
  end
end
