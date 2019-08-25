class CreateFeedEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :feed_entries, id: :uuid do |t|
      t.uuid :user_id, null: false, index: true
      t.string :tags, null: false, array: true, default: []

      t.timestamps
    end

    add_foreign_key :feed_entries, :users
  end
end
