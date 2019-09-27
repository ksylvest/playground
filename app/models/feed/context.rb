class Feed::Context
  attr_accessor :entries

  def initialize(entries: Feed::Entry.all)
    @entries = entries
  end
end
