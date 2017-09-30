User.transaction do
  User.new(name: 'John', email: 'john@beatles.com', password: 'secret').save!
  User.new(name: 'Paul', email: 'paul@beatles.com', password: 'secret').save!
  User.new(name: 'George', email: 'george@beatles.com', password: 'secret').save!
  User.new(name: 'Ringo', email: 'george@beatles.com', password: 'secret').save!
end

Session.transaction do
  User.all.each do |user|
    Session.new(user: user, ip: "#{rand(255)}.#{rand(255)}.#{rand(255)}.#{rand(255)}").save!
  end
end
