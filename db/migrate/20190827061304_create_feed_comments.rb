class CreateFeedComments < ActiveRecord::Migration[6.0]
  def change
    create_table :feed_comments, id: :uuid do |t|
      t.uuid :user_id, null: false, index: true
      t.uuid :entry_id, null: false, index: true
      t.string :message, null: false

      t.timestamp :sent_at, null: false
      t.timestamps
    end

    add_foreign_key :feed_comments, :users
    add_foreign_key :feed_comments, :feed_entries, column: :entry_id
  end
end
