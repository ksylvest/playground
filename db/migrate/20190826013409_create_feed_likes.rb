class CreateFeedLikes < ActiveRecord::Migration[6.0]
  def change
    create_table :feed_likes do |t|
      t.uuid :user_id, null: false, index: true
      t.uuid :entry_id, null: false, index: true

      t.timestamps
    end

    add_foreign_key :feed_likes, :users
    add_foreign_key :feed_likes, :feed_entries, column: :entry_id

    add_index :feed_likes, %i[user_id entry_id], unique: true
  end
end
