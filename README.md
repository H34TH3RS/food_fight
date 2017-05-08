# ![pageres](app/client/images/food_fight_logo.png)





Food Fight

A Game of Wits & Grits

Battle your way to victory with characters created from UPC nutrition data!
Encounter food-based villains, collect special food items that bump up your health and stats, and face off with the evil final boss, Kevin Bacon & Eggs.

Live URL: https://food-fight-ssm.herokuapp.com


How to Get Started

1. Clone this repo.
2. Run `npm install` in your terminal. This will install the dependencies needed for this application.
3. Run `bundle` in the terminal to install the necessary ruby gems.
4. Run the grunt command from the root directory of the project. This will execute the automated build process.
5. Start the rails server by typing `rails s` into your terminal.
6. Go to http://localhost:3000/ to view your application locally.


Application Deployment & Dependencies

This application features continuous integration that automatically deploys to the live site any time a commit or merge to the master branch is made. Heroku will run the automated grunt build prior to deploying the updated code. If the build command fails, the live site will not be updated.

Due to this automated deployment system, all dependencies must be installed as regular application dependencies and NOT as devDependencies. When adding additional dependencies, use --save and not --save-dev.

The testing suite is run through Karma. Heroku does not currently support running Karma through its automatic deployment feature. Run the grunt karma command prior to committing or merging to the master branch to ensure that the code has been tested properly.

Back-end testing is performed via Rspec. In order to run the tests, simply type `rspec` into the command-line. By default, the Simplecov gem is installed to analyze test coverage. Code coverage will be logged in a separate log file, a link to which will be displayed each time rspec is run.


#### Nutritionix API
UPC data is sent to the Nutritionix API in order to create character cards. In order to use the application you will need to get your own Nutritionix API key, which are available for free if you require less than 50 UPC searches per day.

The application is configured to install `dotenv-rails` with bundler for storing  secrets. Set your Nutritionix APP ID equal to NUTRITIONIX_APP_ID and your APP KEY equal to NUTRITIONIX_APP_KEY in the .env file.

 ```
 NUTRITIONIX_APP_ID=(youridhere)
 NUTRITIONIX_APP_KEY=(yourappkeyhere)
 ```



FAQ / Troubleshooting

Why on earth would we make such a silly game?

Studies have shown that billions of people on this planet eat food. We've been eating food our entire lives. When we were tasked with coming up with an idea for a final project at The Iron Yard DC, we decided to take our love of food and our love of video games and combine them into this game.

The inspiration for using UPC data was a vintage Japanese handheld video game called Barcode Battler. (https://en.wikipedia.org/wiki/Barcode_Battler) This console allowed the player to scan barcodes from any product to create characters, enemies and power-ups.


Future Features

1) Character cards created by users have an expiration date. Upon reaching this date, the food will "go bad" and be converted into an enemy card, against which the user's "fresh" cards will battle.
2) The ability to choose which saved card the user would like to use to play the game directly from the "view all cards" page. Currently only the most recently created card is used for battle.
3) A new card will drop in on every roll for all enemies, items, and neutral spaces.
4) The ability to display multiple player cards and drag and drop them into battle as needed, or determine the battle outcome of the group of cards vs the enemy or enemies.
5) More defensive and offensive buffs from available nutrition data such as percentages of daily vitamins.
6) Character leveling and enemy stats scaling based on the character level.


Known Issues


Contributing

Like our game? Think it could be better? Share your ideas!
1. Think up an awesome idea.
2. Fork this repo. (link)
3. Create a branch for your feature. (git checkout -b feature-name)
4. Add and commit your changes. (git add file_name) (git commit -m "I added a thing!")
5. Push your feature to your branch. (git push origin feature-name)
6. Create a Pull Request.
7. Profit!


[![Sara Basile](app/client/images/sara_pic.jpg)](https://github.com/WatchTheGap) | [![Seth Brady](app/client/images/seth.jpg)](http://www.sethgabrielbrady.com) | [![Molly Stoopler](app/client/images/molly_pic.png)](https://github.com/mstoople532)
---|---|---
[Sara Basile](https://github.com/WatchTheGap) | [Seth Brady](http://www.sethgabrielbrady.com) | [Molly Stoopler](https://github.com/mstoople532)
