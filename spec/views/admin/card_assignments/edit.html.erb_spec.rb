require 'rails_helper'

RSpec.describe "admin/card_assignments/edit", type: :view do
  before(:each) do
    @card_assignment = assign(:admin_card_assignment, CardAssignment.create!())
  end

  it "renders the edit admin_card_assignment form" do
    render

    assert_select "form[action=?][method=?]", admin_card_assignment_path(@card_assignment), "post" do
    end
  end
end
