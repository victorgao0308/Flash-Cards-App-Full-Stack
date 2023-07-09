const Pool = require("pg").Pool;

const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "flashcards",
  password: "password",
  port: 5432,
});
const getUsers = (request, response) => {
  pool.query(
    "SELECT * FROM accounts ORDER BY user_id ASC",
    (error, results) => {
      response.status(200).json(results.rows);
    }
  );
};

const getUserByUsername = (request, response) => {
  username = request.params.username;

  pool.query(
    "SELECT * FROM accounts WHERE username = $1",
    [username],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createUser = (request, response) => {
  const { username, password, email } = request.body;
  pool.query(
    "INSERT INTO accounts (username, password, email) VALUES ($1, $2, $3) RETURNING *",
    [username, password, email],
    (error, results) => {
      if (error) {
        response.status(200).send(`${error}`);
        throw error;
      } else {
        response
          .status(200)
          .send(`User added with ID: ${results.rows[0].user_id}`);
      }
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM accounts WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
};
