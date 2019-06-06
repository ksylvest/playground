class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications, id: :uuid do |t|
      t.uuid :user_id, null: false, index: true
      t.text :message, null: false

      t.timestamp :read_at, null: true
      t.timestamp :deleted_at, null: true
      t.timestamp :sent_at, null: false
      t.timestamps
    end

    add_foreign_key :notifications, :users
  end
end
