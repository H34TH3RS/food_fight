class NutritionixApi
  def get_nutrition_data(upc)
    HTTParty.get("https://api.nutritionix.com/v1_1/item?upc=#{upc}&appId=066ef33f&appKey=5a0965d7cc3c522658a22109fe1a65c0")
  end
end
