// include required packages
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(express.json());

// database config
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

// 🔍 test database connection once
(async () => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    console.log("✅ Database connected");
    await conn.end();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();

// =======================
// GET all cards
// =======================
app.get("/allcards", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT * FROM cards");
    await connection.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error for allcards" });
  }
});

// =======================
// ADD card
// =======================
app.post("/addcard", async (req, res) => {
  const { card_name, card_pic } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      "INSERT INTO cards (card_name, card_pic) VALUES (?, ?)",
      [card_name, card_pic]
    );
    await connection.end();

    res.status(201).json({ message: "Card added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error - could not add card" });
  }
});

// =======================
// UPDATE card
// =======================
app.put("/updatecard/:id", async (req, res) => {
  const { id } = req.params;
  const { card_name, card_pic } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      "UPDATE cards SET card_name=?, card_pic=? WHERE card_id=?",
      [card_name, card_pic, id]
    );
    await connection.end();

    res.json({ message: "Card updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error - could not update card" });
  }
});

// =======================
// DELETE card
// =======================
app.delete("/deletecard/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      "DELETE FROM cards WHERE card_id=?",
      [id]
    );
    await connection.end();

    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error - could not delete card" });
  }
});

// start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
