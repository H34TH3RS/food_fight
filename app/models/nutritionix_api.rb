# frozen_string_literal: true

class NutritionixApi
  def get_nutrition_data(upc)
    HTTParty.get('https://api.nutritionix.com/v1_1/item', query: {
                   upc: upc,
                   appId: ENV['NUTRITIONIX_APP_ID'],
                   appKey: ENV['NUTRITIONIX_APP_KEY']
                 })
  end
end
