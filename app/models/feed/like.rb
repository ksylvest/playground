class Feed::Like < ApplicationRecord
  belongs_to :user
  belongs_to :entry
end
