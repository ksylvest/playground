class CreateGeoIps < ActiveRecord::Migration[5.2]
  def change
    create_table :geo_ips, id: :uuid do |t|
      t.inet :ip, null: false, index: { unique: true }

      t.string :city, null: false
      t.string :region, null: false
      t.string :country, null: false
      t.string :continent, null: false
      t.string :zip, null: false
      t.decimal :latitude, null: false
      t.decimal :longitude, null: false

      t.timestamps
    end
  end
end
