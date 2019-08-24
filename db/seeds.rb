require 'open-uri'

User.transaction do
  YAML.load(File.open(Rails.root.join('db', 'seeds', 'users.yml'))).each do |data|
    next if User.exists?(id: data['id'])

    user = User.new(id: data['id'], name: data['name'], email: data['email'])
    user.avatar.attach(io: URI.parse(data['avatar']).open, filename: 'avatar')
    user.password = SecureRandom.alphanumeric
    user.save!
  end
end

Feed::Entry.transaction do
  YAML.load(File.open(Rails.root.join('db', 'seeds', 'feed', 'entries.yml'))).each do |data|
    next if Feed::Entry.exists?(id: data['id'])

    entry = Feed::Entry.new(id: data['id'])
    entry.user = User.order('RANDOM()').take
    data['photos'].each do |url|
      entry.photos.attach(io: URI.parse(url).open, filename: 'photo')
    end
    entry.save!
  end
end

Stripe::Product.list.each do |stripe_product|
  product = Billing::Product.find_or_initialize_by(stripe_id: stripe_product.id)
  product.parse(stripe_product)
  product.save!
end

Stripe::Plan.list.each do |stripe_plan|
  plan = Billing::Plan.find_or_initialize_by(stripe_id: stripe_plan.id)
  plan.product = Billing::Product.find_by!(stripe_id: stripe_plan.product)
  plan.parse(stripe_plan)
  plan.save!
end

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
