class CardBuilder
  def build_card_from_api(upc)
    api_data = NutritionixApi.new.get_nutrition_data(upc)
    nutrition_data = api_data.slice(
      'item_name',
      'nf_calories',
      'nf_total_fat',
      'nf_total_carbohydrate',
      'nf_dietary_fiber',
      'nf_sugars',
      'nf_protein',
      'nf_vitamin_a_dv',
      'nf_vitamin_c_dv',
      'nf_calcium_dv',
      'nf_iron_dv',
      'nf_potassium',
      'nf_sodium'
    )

    basic_card_data = CardConverter.new.convert!(nutrition_data)
    added_data = {
      upc: upc,
      nutrition_data: nutrition_data.as_json
    }
    basic_card_data.merge(added_data)
  end
end
