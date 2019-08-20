class CreateBillingCustomers < ActiveRecord::Migration[5.2]
  def change
    create_table :billing_customers, id: :uuid do |t|
      t.string :stripe_id, null: false, index: { unique: true }
      t.uuid :user_id, null: false, index: { unique: true }
      t.string :currency

      t.timestamps
    end

    add_foreign_key :billing_customers, :users
  end
end
