# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


Food Fight

A Game of Wits & Grits

Battle your way to victory with characters created from UPC nutrition data!
Encounter food-based villains, collect special food items that bump up your health and stats, and face off with the evil final boss, Kevin Bacon & Eggs.

Live URL: https://food-fight-ssm.herokuapp.com

How to Get Started

1) Clone this repo.
2) Run npm install in your terminal. This will install the dependencies needed for this application.
3) Run the grunt command from the root directory of the project. This will execute the automated build process.
4) Start up your rails server and got to http://localhost:3000/

Application Deployment & Dependencies

This application features continuous integration that automatically deploys to the live site any time a commit or merge to the master branch is made. Heroku will run the automated grunt build prior to deploying the updated code. If the build command fails, the live site will not be updated.

Due to this automated deployment system, all dependencies must be installed as regular application dependencies and NOT as devDependencies. When adding additional dependencies, use --save and not --save-dev.

The testing suite is run through Karma. Heroku does not currently support running Karma through its automatic deployment feature. Run the grunt karma command prior to committing or merging to the master branch to ensure that the code has been tested properly.

Nutritionix API

Food Fight API

Contributing

Like our game? Think it could be better? Share your ideas!
1) Think up an awesome idea.
2) Fork this repo. (link)
3) Create a branch for your feature. (git checkout -b feature-name)
4) Add and commit your changes. (git add file_name) (git commit -m "I added a thing!")
5) Push your feature to your branch. (git push origin feature-name)
6) Create a Pull Request.
7) Profit!
