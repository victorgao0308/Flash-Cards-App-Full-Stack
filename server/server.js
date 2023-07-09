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

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/users", db.getUsers);
app.get("/users/:username", db.getUserByUsername);

app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);


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
