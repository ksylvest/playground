class RenameSessionsToAuthentications < ActiveRecord::Migration[7.0]
  def change
    rename_table :sessions, :authentications
  end
end
