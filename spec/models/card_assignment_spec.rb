# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CardAssignment, type: :model do
  it 'exists' do
    expect CardAssignment
  end
  it 'can set a card expiration date' do
    current_user = users(:russell)
    card = cards(:coke)
    current_user.cards << card
    card.save
    expect(card.card_assignments.last.expires_at).to be_within(1.week + 1.minute).of(Time.current)
  end
end
