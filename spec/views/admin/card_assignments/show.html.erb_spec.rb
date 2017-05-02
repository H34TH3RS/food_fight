require 'rails_helper'

RSpec.describe "admin/card_assignments/show", type: :view do
  before(:each) do
    @card_assignment = assign(:admin_card_assignment, CardAssignment.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
