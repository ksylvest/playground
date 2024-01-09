class AddTokenToAuthentications < ActiveRecord::Migration[7.1]
  def change
    add_column :authentications, :token, :string
    add_index :authentications, :token, unique: true
  end
end
