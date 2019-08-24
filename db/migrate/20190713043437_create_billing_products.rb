class CreateBillingProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :billing_products, id: :uuid do |t|
      t.string :stripe_id, null: false, index: { unique: true }
      t.string :name, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
