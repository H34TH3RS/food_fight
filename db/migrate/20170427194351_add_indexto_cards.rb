# frozen_string_literal: true

class AddIndextoCards < ActiveRecord::Migration[5.0]
  def change
    add_index :cards, :upc
  end
end
