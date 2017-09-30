class CreateSessions < ActiveRecord::Migration[5.1]
  def change
    create_table :sessions do |t|
      t.references :user, null: false, index: true
      t.string :token, null: false, index: true
      t.inet :ip, null: false

      t.timestamps
    end

    add_foreign_key :sessions, :users
  end
end
