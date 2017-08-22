class CreateEmployees < ActiveRecord::Migration[5.1]
  def change
    create_table :employees do |t|
      t.string :name, null: false
      t.string :email, null: false, index: { unique: true }
      t.references :company, null: false

      t.timestamps
    end
    add_foreign_key :employees, :companies
  end
end
