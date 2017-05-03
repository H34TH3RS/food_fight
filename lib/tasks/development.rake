namespace :development do
  desc 'Delete all cards and card_assignments from database'
  task delete_all: :environment do
    CardAssignment.delete_all
    Card.delete_all
  end
end
