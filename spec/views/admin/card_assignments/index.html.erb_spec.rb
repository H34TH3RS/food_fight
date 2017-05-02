require 'rails_helper'

RSpec.describe "admin/card_assignments/index", type: :view do
  before(:each) do
    assign(:admin_card_assignments, [
      CardAssignment.create!(),
      CardAssignment.create!()
    ])
  end

  it "renders a list of admin/card_assignments" do
    render
  end
end
