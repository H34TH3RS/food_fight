# frozen_string_literal: true

CARD_KEYS = {
  'item_name' => :food_name,
  'nf_calories' => :health,
  'nf_total_fat' => :defense,
  'nf_total_carbohydrate' => :energy,
  'nf_dietary_fiber' => :accuracy,
  'nf_sugars' => :energy_debuff,
  'nf_protein' => :strength,
  'nf_vitamin_a_dv' => :accuracy_buff,
  'nf_vitamin_c_dv' => :health_buff,
  'nf_calcium_dv' => :physical_resistance_debuff,
  'nf_iron_dv' => :attack_buff,
  'nf_potassium' => :cleanse,
  'nf_sodium' => :salt
}.freeze

class CardConverter
  def convert!(nutrition_data)
    nutrition_data.fetch('nf_calories') + 100
    nutrition_data.map { |key, value| [CARD_KEYS[key], value] }.to_h
  end
end
