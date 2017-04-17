class User < ApplicationRecord
  has_secure_password
  before_create :set_auth_token
  def set_auth_token
    self.auth_token = SecureRandom.hex
  end

  def reset_auth_token!
    set_auth_token
    save
  end
end
