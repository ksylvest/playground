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
