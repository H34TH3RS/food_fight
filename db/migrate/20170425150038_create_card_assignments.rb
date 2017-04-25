class CreateCardAssignments < ActiveRecord::Migration[5.0]
  def change
    create_table :card_assignments do |t|
      t.references :user, foreign_key: true
      t.references :card, foreign_key: true

      t.timestamps
    end
  end
end
