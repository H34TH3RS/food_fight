class Admin::CardAssignmentsController < ApplicationController
  before_action :set_card_assignment, only: [:show, :edit, :update, :destroy]

  # GET /admin/card_assignments
  # GET /admin/card_assignments.json
  def index
    @card_assignments = CardAssignment.all
  end

  # GET /admin/card_assignments/1
  # GET /admin/card_assignments/1.json
  def show
  end

  # GET /admin/card_assignments/new
  def new
    @card_assignment = CardAssignment.new
  end

  # GET /admin/card_assignments/1/edit
  def edit
  end

  # POST /admin/card_assignments
  # POST /admin/card_assignments.json
  def create
    @card_assignment = CardAssignment.new(admin_card_assignment_params)

    respond_to do |format|
      if @card_assignment.save
        format.html { redirect_to @card_assignment, notice: 'Card assignment was successfully created.' }
        format.json { render :show, status: :created, location: @card_assignment }
      else
        format.html { render :new }
        format.json { render json: @card_assignment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/card_assignments/1
  # PATCH/PUT /admin/card_assignments/1.json
  def update
    respond_to do |format|
      if @card_assignment.update(admin_card_assignment_params)
        format.html { redirect_to @card_assignment, notice: 'Card assignment was successfully updated.' }
        format.json { render :show, status: :ok, location: @card_assignment }
      else
        format.html { render :edit }
        format.json { render json: @card_assignment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/card_assignments/1
  # DELETE /admin/card_assignments/1.json
  def destroy
    @card_assignment.destroy
    respond_to do |format|
      format.html { redirect_to admin_card_assignments_url, notice: 'Card assignment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_card_assignment
      @card_assignment = CardAssignment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def admin_card_assignment_params
      params.require(:card_assignment).permit(:expires_at)
    end
end
