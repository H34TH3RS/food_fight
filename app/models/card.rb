# frozen_string_literal: true

class Card < ApplicationRecord
  has_many :card_assignments
  has_many :users, through: :card_assignments
end
