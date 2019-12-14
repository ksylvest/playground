class CreateBillingPlans < ActiveRecord::Migration[5.2]
  def change
    create_table :billing_plans, id: :uuid do |t|
      t.string :stripe_id, null: false, index: { unique: true }
      t.uuid :product_id, null: false, index: true
      t.integer :amount, null: false
      t.string :currency, null: false
      t.string :interval, null: false

      t.timestamps
    end

    add_foreign_key :billing_plans, :billing_products, column: :product_id
  end
end
