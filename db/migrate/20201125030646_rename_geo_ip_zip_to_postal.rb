class RenameGeoIPZipToPostal < ActiveRecord::Migration[6.0]
  def change
    rename_column :geo_ips, :zip, :postal
  end
end
