# frozen_string_literal: true

class CardAssignment < ApplicationRecord
  belongs_to :user
  belongs_to :card
  before_create :set_expiry

  def set_expiry
    self.expires_at = Time.current + 1.week
  end
end
