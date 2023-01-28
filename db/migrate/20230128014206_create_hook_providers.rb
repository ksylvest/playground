class CreateHookProviders < ActiveRecord::Migration[7.0]
  def change
    create_table :hook_providers do |t|
      t.string :name, null: false, index: { unique: true }
      t.string :slug, null: false, index: { unique: true }
      t.string :token_digest, null: false

      t.timestamps
    end
  end
end
