class CreateBillingSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :billing_subscriptions, id: :uuid do |t|
      t.string :stripe_id, null: false, index: { unique: true }
      t.uuid :customer_id, null: false, index: true
      t.uuid :plan_id, null: false, index: true

      t.timestamps
    end

    add_foreign_key :billing_subscriptions, :billing_customers, column: :customer_id
    add_foreign_key :billing_subscriptions, :billing_plans, column: :plan_id
  end
end
