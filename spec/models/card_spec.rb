# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Card, type: :model do
  it 'exists' do
    expect Card
  end
  it 'can parse upc data' do
    card = Card.create(upc: '1234-1234-1234')
    expect card[:upc].to equal '123412341234'
  end
end
