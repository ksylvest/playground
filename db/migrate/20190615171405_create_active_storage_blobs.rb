class CreateActiveStorageBlobs < ActiveRecord::Migration[5.2]
  def change
    create_table :active_storage_blobs, id: :uuid do |t|
      t.string :key, null: false, index: { unique: true }
      t.string :filename, null: false
      t.string :content_type
      t.text :metadata
      t.bigint :byte_size, null: false
      t.string :checksum, null: false
      t.timestamps
    end
  end
end
