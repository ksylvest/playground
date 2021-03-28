class CreateBillingSources < ActiveRecord::Migration[6.1]
  def change
    create_table :billing_sources do |t|

      t.timestamps
    end
  end
end
