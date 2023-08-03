const Pool = require("pg").Pool;


// CHANGE PSQL INFO HERE
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

const getSets = (request, response) => {
  pool.query("SELECT * FROM sets ORDER BY set_id ASC", (error, results) => {
    response.status(200).json(results.rows);
  });
};

const getSetsByOwner = (request, response) => {
  const owner = request.params.owner;
  pool.query(
    "SELECT * FROM sets WHERE owner = $1",
    [owner],
    (error, results) => {
      response.status(200).json(results.rows);
    }
  );
};

const createSet = (request, response) => {
  const { setName, owner } = request.body;

  pool.query(
    "INSERT INTO sets (set_name, owner) VALUES ($1, $2) RETURNING *",
    [setName, owner],
    (error, results) => {
      if (error) {
        response.status(200).send(`${error}`);
        throw error;
      } else {
        response
          .status(200)
          .send(`Set added with ID: ${results.rows[0].set_id}`);
      }
    }
  );
};

const createCard = (request, response) => {
  const { front, back } = request.body;

  pool.query(
    "INSERT INTO cards (front, back) VALUES ($1, $2) RETURNING *",
    [front, back],
    (error, results) => {
      if (error) {
        response.status(200).send(`${error}`);
        throw error;
      } else {
        response
          .status(200)
          .send(`Card added with ID: ${results.rows[0].card_id}`);
      }
    }
  );
};

const getCards = (request, response) => {
  pool.query("SELECT * FROM cards ORDER BY card_id ASC", (error, results) => {
    response.status(200).json(results.rows);
  });
}


const getCardsFromSet = (request, response) => {
  const setId = request.params.id;
  pool.query("SELECT cards FROM sets WHERE set_id = $1", [setId], (error, results) => {
    response.status(200).json(results.rows);
  });
}

const addCardsToSet = (request, response) => {
  const setId = request.params.id;
  const {cards} = request.body.cards;
  pool.query("UPDATE sets SET cards = $1 WHERE set_id = $2", [cards, setId],
  (error, results) => {
    if (error) {
      response.status(200).send(`${error}`)
    } else response.status(200).send(`Added cards to set with ID: ${setId}`);
  })
}

const editSetName = (request, response) => {
  const setId = request.params.id;
  const setName  = request.body.set_name;
  pool.query("UPDATE sets SET set_name = $1 WHERE set_id = $2", [setName, setId],
  (error, results) => {
    if (error) {
      response.status(200).send(`${error}`)
    } else response.status(200).send(`Updated set ${setId} to ${setName}`);
  })
}

const deleteSet = (request, response) => {
  const setId = request.params.id;
  pool.query("DELETE FROM sets WHERE set_id = $1", [setId], (error, results) => {
    if (error) response.status(200).send(`${error}`);
    else response.status(200).send(`Set deleted with ID: ${setId}`);
  });
}

const getCardById = (request, response) => {
  const cardId = request.params.id;
  pool.query(
    "SELECT * FROM cards WHERE card_id = $1",
    [cardId],
    (error, results) => {
      response.status(200).json(results.rows);
    }
  );
}

const editCard = (request, response) => {
  const cardId = request.params.id;
  const { front, back } = request.body;
  pool.query("UPDATE cards SET front = $1, back = $2 WHERE card_id = $3", [front, back, cardId],
  (error, results) => {
    if (error) {
      response.status(200).send(`${error}`)
    } else response.status(200).send(`Update card with ID: ${cardId}`);
  })
}

const deleteCard = (request, response) => {
  const cardId = request.params.id;
  pool.query("DELETE FROM cards WHERE card_id = $1", [cardId], (error, results) => {
    if (error) response.status(200).send(`${error}`);
    else response.status(200).send(`Card deleted with ID: ${cardId}`);
  });
}

const updateCardStats = (request, response) => {
  const cardId = request.params.id;
  const {mcq_attempted, mcq_correct, mcq_percentage, fitb_attempted, fitb_correct, fitb_percentage, total_attempted, total_correct, total_percentage} = request.body;
  pool.query("UPDATE cards SET mcq_attempted = $1, mcq_correct = $2, mcq_percentage = $3, fitb_attempted = $4, fitb_correct = $5, fitb_percentage = $6, total_attempted = $7, total_correct = $8, total_percentage = $9 WHERE card_id = $10", [mcq_attempted, mcq_correct, mcq_percentage, fitb_attempted, fitb_correct, fitb_percentage, total_attempted, total_correct, total_percentage, cardId],
  (error, results) => {
    if (error) {
      response.status(200).send(`${error}`)
    } else response.status(200).send(`Update card with ID: ${cardId}`);
  })
}


module.exports = {
  getUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  getSets,
  getSetsByOwner,
  createSet,
  createCard,
  getCards,
  getCardsFromSet,
  addCardsToSet,
  getCardById,
  editCard,
  deleteCard,
  editSetName,
  deleteSet,
  updateCardStats
};
