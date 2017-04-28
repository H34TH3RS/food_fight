class RenameColumnExpiryExpiresAt < ActiveRecord::Migration[5.0]
  def change
    rename_column :card_assignments, :expiry, :expires_at
  end
end
