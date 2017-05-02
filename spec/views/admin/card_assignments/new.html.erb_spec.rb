require 'rails_helper'

RSpec.describe "admin/card_assignments/new", type: :view do
  before(:each) do
    assign(:admin_card_assignment, CardAssignment.new())
  end

  it "renders new admin_card_assignment form" do
    render

    assert_select "form[action=?][method=?]", admin_card_assignments_path, "post" do
    end
  end
end
