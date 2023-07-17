const express = require("express");
const cors = require("cors");
const db = require("./queries");
const app = express();

process.on("uncaughtException", (error, origin) => {
  console.log("----- Uncaught exception -----");
  console.log(error);
  console.log("----- Exception origin -----");
  console.log(origin);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("----- Unhandled Rejection at -----");
  console.log(promise);
  console.log("----- Reason -----");
  console.log(reason);
});

app.use(cors());
app.use(express.json());


// users
app.get("/users", db.getUsers);
app.get("/users/:username", db.getUserByUsername);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);


// sets
app.post("/sets", db.createSet);
app.get("/sets", db.getSets);
app.get("/sets/:owner", db.getSetsByOwner);


// cards
app.get("/cards", db.getCards);
app.post("/cards", db.createCard);
app.get("/sets/cards/:id", db.getCardsFromSet);
app.put("/sets/insertcards/:id", db.addCardsToSet);
app.get("/cards/:id", db.getCardById);
app.put("/cards/edit/:id", db.editCard)

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

// const response = fetch("http://localhost:8000/users", {
//   method: "POST",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
//   body: `{
//     "id": 123,
//     "username": "fdjsfdjd",
//     "password": "kjkj",
//     "email": "testing@gmail.com"
//   }`,
// });
