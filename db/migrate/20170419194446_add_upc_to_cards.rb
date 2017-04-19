class AddUpcToCards < ActiveRecord::Migration[5.0]
  def change
    add_column :cards, :upc, :string
  end
end
