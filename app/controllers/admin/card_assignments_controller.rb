# frozen_string_literal: true

class Admin::CardAssignmentsController < Admin::BaseController
  before_action :set_card_assignment, only: %i[show edit update destroy]
  before_action :admin_authorize!

  def index
    @card_assignments = CardAssignment.all
  end

  def show; end

  def new
    @card_assignment = CardAssignment.new
  end

  def edit; end

  def create
    @card_assignment = CardAssignment.new(admin_card_assignment_params)

    if @card_assignment.save
      redirect_to admin_card_assignments_path, notice: 'Card assignment was successfully created.'
    else
      render :new
    end
  end

  def update
    if @card_assignment.update(admin_card_assignment_params)
      redirect_to admin_card_assignments_path, notice: 'Card assignment was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @card_assignment.destroy
    redirect_to admin_card_assignments_url, notice: 'Card assignment was successfully destroyed.'
  end

  private

  def set_card_assignment
    @card_assignment = CardAssignment.find(params[:id])
  end

  def admin_card_assignment_params
    params.require(:card_assignment).permit(:expires_at)
  end
end
