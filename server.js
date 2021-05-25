const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const rowdy = require('rowdy-logger')
const cors = require('cors')

const routesReport = rowdy.begin(app)

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
  routesReport.print()
})

const models = require('./models')

const createJobs = async (req, res) => {
  try {
    let newJob = await models.jobs.create({
      jobtitle: req.body.jobtitle,
      jobdescription: req.body.description, 
      companyname: req.body.companyname,
      salary: req.body.salary
    })
    res.json({newJob})
  } catch (error) {
    console.log(error)
    res.json({error})
  }
}
app.post("/jobs", createJobs)

const getAllJobs = async (req, res) => {
  try {
    let jobs = await models.jobs.findAll()
    res.json({jobs})
  } catch (error) {
    res.json({error})
  }
}

const deleteJob = async(req, res) => {
  try {
    let deletedJob = await models.jobs.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json({deletedJob})
  } catch (error) {
    res.json({error})
  }
}

app.delete('/jobs/:id', deleteJob)

app.get('/jobs', getAllJobs)

app.get('/', (req, res) => {
  res.send('')
})


