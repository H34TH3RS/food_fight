# frozen_string_literal: true

class User < ApplicationRecord
  has_many :card_assignments
  has_many :cards, through: :card_assignments
  has_secure_password
  before_create :set_auth_token
  validates :password, confirmation: true
  validates :password_confirmation, presence: true
  validates :email, presence: true, uniqueness: true

  def set_auth_token
    self.auth_token = SecureRandom.hex
  end

  def reset_auth_token!
    set_auth_token
    save
  end
end
