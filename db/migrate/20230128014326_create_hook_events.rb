class CreateHookEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :hook_events do |t|
      t.references :provider, null: false, foreign_key: { to_table: :hook_providers }
      t.jsonb :data, null: false, default: {}
      t.timestamp :processed_at

      t.timestamps
    end
  end
end
