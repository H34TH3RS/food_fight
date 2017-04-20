# frozen_string_literal: true
CARD_KEYS = {
  'item_name' => :food_name,
  'nf_calories' => :energy,
  'nf_total_fat' => :physical_resistance_debuff,
  'nf_total_carbohydrate' => :health,
  'nf_dietary_fiber' => :accuracy,
  'nf_sugars' => :energy_debuff,
  'nf_protein' => :strength,
  'nf_vitamin_a_dv' => :accuracy_buff,
  'nf_vitamin_c_dv' => :health_buff,
  'nf_calcium_dv' => :defense,
  'nf_iron_dv' => :attack_buff,
  'nf_potassium' => :cleanse
}

class CardConverter
  def convert!(nutrition_data)
    nutrition_data.map { |key, value| [CARD_KEYS[key], value] }.to_h
  end
end
