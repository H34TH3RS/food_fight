# frozen_string_literal: true

class Card < ApplicationRecord
  has_many :card_assignments
  has_many :users, through: :card_assignments
  validates :upc, presence: true

  def upc
    self[:upc]
  end

  def upc=(number)
    number = number.scan(/\d/).join('')
    self[:upc] = number
  end
end
