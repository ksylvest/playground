User.transaction do
  passworded = ->(user) { user.password = SecureRandom.alphanumeric }
  User.find_or_initialize_by(name: 'John', email: 'john@beatles.com', &passworded).save!
  User.find_or_initialize_by(name: 'Paul', email: 'paul@beatles.com', &passworded).save!
  User.find_or_initialize_by(name: 'George', email: 'george@beatles.com', &passworded).save!
  User.find_or_initialize_by(name: 'Ringo', email: 'ringo@beatles.com', &passworded).save!
end

Session.transaction do
  User.all.each do |user|
    Session.find_or_initialize_by(user: user, ip: '0.0.0.0').save!
  end
end

Notification.transaction do
  User.all.each do |user|
    Notification.find_or_initialize_by(user: user, message: "Welcome #{user.name}").save!
    Notification.find_or_initialize_by(user: user, message: "Goodbye #{user.name}").save!
  end
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
