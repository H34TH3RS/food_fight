class AddColumnExpirytoCardAssignments < ActiveRecord::Migration[5.0]
  def change
    add_column :card_assignments, :expiry, :datetime
  end
end
