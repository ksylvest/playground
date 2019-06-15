class CreateActiveStorageAttachments < ActiveRecord::Migration[5.2]
  def change
    create_table :active_storage_attachments, id: :uuid do |t|
      t.string :name, null: false
      t.uuid :record_id, null: false
      t.string :record_type, null: false
      t.uuid :blob_id, null: false, index: true
      t.timestamps

      t.index %i[record_type record_id name blob_id], name: 'index_active_storage_attachments_uniqueness', unique: true
      t.foreign_key :active_storage_blobs, column: :blob_id
    end
  end
end
