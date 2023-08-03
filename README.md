# Flash-Cards-App-Full-Stack
A full stack web app where users can create, review, and study flashcards. Built using the PERN (PostgreSQL, Express.js, React, Node.js) stack.

This app features an adaptive study mode, where questions get more difficult the higher the user's overall accuracy is.

Users can choose to create an account, and safely store the flashcards and sets that they create to the database. Users can also choose to not create an account, and their 
flashcards and sets will get stored in the browser's local storage.

This app also implements local storage caching, where information from the database gets loaded into the browser's local storage upon signing in. This helps reduce load
times by up to 50%, and it also helps minimize calls to the database.
## Running the program
To run the program, download the `client` and the `server` file into a new folder. Download the `node_modules` folder to get all of the app's required modules. Then,
open two terminals; `cd` into `client` on one, and into `server` on the other. Then, on the client terminal type `npm start`, and in the server terminal type `npm start dev`.

NOTE: The current database setup is with a local one, so if you want database integration, you will need to create your own local psql database. 
