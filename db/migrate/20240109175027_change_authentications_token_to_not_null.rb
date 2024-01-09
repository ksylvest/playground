class ChangeAuthenticationsTokenToNotNull < ActiveRecord::Migration[7.1]
  def up
    change_column_null :authentications, :token, false
  end
end
