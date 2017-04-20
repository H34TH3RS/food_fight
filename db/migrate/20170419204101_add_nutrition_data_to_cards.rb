class AddNutritionDataToCards < ActiveRecord::Migration[5.0]
  def change
    add_column :cards, :nutrition_data, :jsonb
  end
end
