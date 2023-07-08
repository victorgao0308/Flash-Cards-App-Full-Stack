const express = require("express");
const cors = require("cors");
const db = require("./queries");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
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
