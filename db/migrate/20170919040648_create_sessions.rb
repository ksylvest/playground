class CreateSessions < ActiveRecord::Migration[5.1]
  def change
    create_table :sessions, id: :uuid do |t|
      t.uuid :user_id, null: false, index: true
      t.inet :ip, null: false
      t.string :status, null: false, default: 'online'

      t.timestamp :deleted_at
      t.timestamp :seen_at, null: false
      t.timestamps
    end

    add_foreign_key :sessions, :users
  end
end
