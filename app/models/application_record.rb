class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  connects_to database: {
    primary: :primary,
    follower: :follower,
  }
end
