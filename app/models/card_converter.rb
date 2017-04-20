class CardConverter
  def convert!(nutrition_data)
    card_keys = {
      "item_name" => "food_name",
      "nf_calories" => "energy",
      "nf_total_fat" => "enemy_health_debuff",
      "nf_total_carbohydrate" => "health",
      "nf_dietary_fiber" => "base_accuracy",
      "nf_sugars" => "enemy_energy_debuff",
      "nf_protein" => "strength",
      "nf_vitamin_a_dv" => "accuracy",
      "nf_vitamin_c_dv" => "health_buff",
      "nf_calcium_dv" => "defense",
      "nf_iron_dv" => "attack",
      "nf_potassium" => "cleanse"
    }

    nutrition_data.map { |key, value| [card_keys[key], value] }
  end
end
