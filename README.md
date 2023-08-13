# Flash-Cards-App-Full-Stack
A full stack web app where users can create, review, and study flashcards. Built using the PERN (PostgreSQL, Express.js, React, Node.js) stack.

This app features an adaptive study mode, where questions get more difficult the higher the user's overall accuracy is.

Users can choose to create an account, and safely store the flashcards and sets that they create to the database. Users can also choose to not create an account, and their 
flashcards and sets will get stored in the browser's local storage.

This app also implements local storage caching, where information from the database gets loaded into the browser's local storage upon signing in. This helps reduce load
times by up to 50%, and it also helps minimize calls to the database.
## Running the program
To run the program, download the `client` and the `server` file into a new folder. Optionally, download the `node_modules` folder to get all of the app's required modules. Then,
open two terminals; `cd` into `client` on one, and into `server` on the other. Then, on the client terminal type `npm start`, and in the server terminal type `npm start dev`.

NOTE: The current database setup is with a local one, so if you want database integration, you will need to create your own local PostgreSQL database. 
The app will still work without a database; information will be instead stored in the local storage of the browser.

### If you wish to host a local database, the commands to create the database and tables are below:

NOTE: The default user of the PostgreSQL is `me`, the default password is `password`, and the default port is `5432`.\
If you wish to change these credentials, navigate to `server/queries.js` and update the following code chunk:
```
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "flashcards",
  password: "password",
  port: 5432,
});
```
Once the credentials match, enter these commands to properly set up the database and tables:
```
CREATE DATABASE flashcards;
```
```
\c flashcards
```
```
CREATE TABLE accounts (
    user_id INT PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    sets_owned big_int[]
);
```
```
CREATE TABLE cards (
    card_id INT PRIMARY KEY,
    front VARCHAR,
    back VARCHAR,
    mcq_attempted VARCHAR,
    mcq_correct VARCHAR,
    mcq_percentage VARCHAR,
    fitb_attempted VARCHAR,
    fitb_correct VARCHAR,
    fitb_percentage VARCHAR,
    total_attempted VARCHAR,
    total_correct VARCHAR,
    total_percentage VARCHAR
);
```
```
CREATE TABLE sets (
    set_id INT PRIMARY KEY,
    set_name VARCHAR,
    total_time_studied VARCHAR,
    total_accuracy VARCHAR,
    owner VARCHAR,
    cards bigint[]
);
```



    
