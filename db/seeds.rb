require "open-uri"

Rails.logger = Logger.new($stdout)

# @param id [String]
# @return [URI]
def unsplash_uri(id:)
  URI.parse(Unsplash.api.photo(id:)["urls"]["full"])
end

User.transaction do
  YAML.load(File.open(Rails.root.join("db/seeds/users.yml"))).each do |data|
    next if User.exists?(id: data["id"])

    unsplash_id = data["avatar"]["unsplash_id"]
    avatar_uri = unsplash_uri(id: unsplash_id)

    user = User.new(id: data["id"], name: data["name"], email: data["email"])
    user.avatar.attach(io: avatar_uri.open, filename: "avatar")
    user.password = SecureRandom.alphanumeric
    user.save!
  end
end

Feed::Entry.transaction do
  YAML.load(File.open(Rails.root.join("db/seeds/feed/entries.yml"))).each do |data|
    next if Feed::Entry.exists?(id: data["id"])

    entry = Feed::Entry.new(id: data["id"])
    entry.user = User.order("RANDOM()").take
    data["photos"].each do |photo|
      unsplash_id = photo["unsplash_id"]
      photo_uri = unsplash_uri(id: unsplash_id)
      entry.photos.attach(io: photo_uri.open, filename: "photo")
    end
    entry.save!
  end
end

if Stripe.api_key.present?
  Stripe::Customer.list.each do |stripe_customer|
    user = User.find_by(email: stripe_customer.email)
    next unless user

    customer = Billing::Customer.find_or_initialize_by(stripe_id: stripe_customer.id)
    customer.user = user
    customer.parse(stripe_customer)
    customer.save!

    stripe_customer.sources.each do |stripe_source|
      source = Billing::Source.find_or_initialize_by(stripe_id: stripe_source.id)
      source.customer = customer
      source.default = stripe_source.id.eql?(stripe_customer.default_source)
      source.parse(stripe_source)
      source.save!
    end
  end
else
  Rails.logger.warn "[SKIP] Stripe::Customer due to missing 'config/master.key'"
end
