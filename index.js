const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a job

app.post("/joblist", async (req, res) => {
  try {
    const { description } = req.body;
    const newJob = await pool.query(
      "INSERT INTO joblist (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newJob.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all jobs

//delete a job

//update a job

