class CreateFollows < ActiveRecord::Migration[6.0]
  def change
    create_table :follows, id: :uuid do |t|
      t.uuid :followed_id, null: false, index: true
      t.uuid :follower_id, null: false, index: true

      t.timestamps
    end

    add_foreign_key :follows, :users, column: :followed_id
    add_foreign_key :follows, :users, column: :follower_id

    add_index :follows, %i[followed_id follower_id], unique: true
  end
end
