require 'rails_helper'

RSpec.describe "Admin::CardAssignments", type: :request do
  describe "GET /admin_card_assignments" do
    it "works! (now write some real specs)" do
      get admin_card_assignments_path
      expect(response).to have_http_status(200)
    end
  end
end
