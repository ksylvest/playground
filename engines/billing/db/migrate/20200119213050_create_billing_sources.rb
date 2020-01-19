class CreateBillingSources < ActiveRecord::Migration[6.0]
  def change
    create_table :billing_sources, id: :uuid do |t|
      t.string :stripe_id, null: false, index: { unique: true }
      t.uuid :customer_id, null: false, index: true
      t.boolean :default, null: false, default: false
      t.string :brand, null: false
      t.string :funding, null: false
      t.string :number, null: false
      t.integer :exp_month, null: false
      t.integer :exp_year, null: false

      t.timestamps
    end

    add_foreign_key :billing_sources, :billing_customers, column: :customer_id
  end
end
