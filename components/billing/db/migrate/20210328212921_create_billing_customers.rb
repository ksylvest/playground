class CreateBillingCustomers < ActiveRecord::Migration[6.1]
  def change
    create_table :billing_customers, id: :uuid do |t|
      t.string :stripe_id, null: false, index: { unique: true }
      t.references :user, null: false, index: true
      t.string :currency

      t.timestamps
    end
  end
end
