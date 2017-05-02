require "rails_helper"

RSpec.describe Admin::CardAssignmentsController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/admin/card_assignments").to route_to("admin/card_assignments#index")
    end

    it "routes to #new" do
      expect(:get => "/admin/card_assignments/new").to route_to("admin/card_assignments#new")
    end

    it "routes to #show" do
      expect(:get => "/admin/card_assignments/1").to route_to("admin/card_assignments#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/admin/card_assignments/1/edit").to route_to("admin/card_assignments#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/admin/card_assignments").to route_to("admin/card_assignments#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/admin/card_assignments/1").to route_to("admin/card_assignments#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/admin/card_assignments/1").to route_to("admin/card_assignments#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/admin/card_assignments/1").to route_to("admin/card_assignments#destroy", :id => "1")
    end

  end
end
