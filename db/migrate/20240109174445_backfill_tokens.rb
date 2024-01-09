class BackfillTokens < ActiveRecord::Migration[7.1]
  def change
    Authentication.find_each do |authentication|
      authentication.regenerate_token
      authentication.save!
    end
  end
end
