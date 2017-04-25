class AddSalttoCards < ActiveRecord::Migration[5.0]
  def change
    add_column :cards, :salt, :integer
  end
end
