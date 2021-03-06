# frozen_string_literal: true

class User < ApplicationRecord
  has_many :card_assignments
  has_many :cards, through: :card_assignments
  has_secure_password
  before_create :set_auth_token
  validates :password, confirmation: true, on: :create
  validates :password_confirmation, presence: true, on: :create
  validates :email, presence: true, uniqueness: true, on: :create

  def set_auth_token
    self.auth_token = SecureRandom.hex
  end

  def reset_auth_token!
    set_auth_token
    save
  end

  def admin?
    role == "admin"
  end
end
