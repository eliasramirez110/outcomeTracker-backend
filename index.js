const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

//middleware
app.use(cors());
app.use(express.json());

//Routes

//create a job
app.post("/jobs",  async(req, res) => {
  try {
    
    console.log(req.body)

  } catch (error) {
    console.error(err.messgae);
  }
})

app.listen(5000, () => {
  console.log("server has started on port 5000");
});