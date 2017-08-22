class CreateCompanies < ActiveRecord::Migration[5.1]
  def change
    create_table :companies do |t|
      t.string :name, null: false, index: { unique: true }
      t.references :address, null: false, index: true

      t.timestamps
    end

    add_foreign_key :companies, :addresses
  end
end
