# frozen_string_literal: true

class CardBuilder
  attr_reader :upc
  def initialize(upc)
    @upc = upc
  end

  def card
    card = Card.find_by(upc: upc)
    if card
      card
    else
      card_data = build_card_from_api(upc)
      Card.new(card_data) if card_data
    end
  end

  def build_card_from_api(upc)
    api_data = NutritionixApi.new.get_nutrition_data(upc)
    return if api_data['status_code'] == 404
    # Remove the source data that we converted to card attributes.
    nutrition_data = api_data.to_h.slice(*CardConverter::CARD_KEYS.keys)
    basic_card_data = CardConverter.new.convert!(nutrition_data)
    basic_card_data.transform_values! { |value| value || 0 }

    added_data = {
      upc: upc,
      nutrition_data: nutrition_data.as_json
    }
    basic_card_data.merge(added_data)
  end
end
