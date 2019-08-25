class Feed::Context
  def entries
    @entries ||= Feed::Entry.all
  end
end
