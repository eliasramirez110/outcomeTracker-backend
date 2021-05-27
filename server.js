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
  console.log(req.body)
  try {
    let newJob = await models.jobs.create({
      jobtitle: req.body.jobtitle,
      jobdescription: req.body.description, 
      companyname: req.body.companyname,
      salary: req.body.salary,
      submitDate: req.body.submitDate,
      contactInfo: req.body.contactInfo
    })
    res.json({newJob})
  } catch (error) {
    console.log(error)
    res.json({error})
  }
}

const updateJob = async (req,res) => {
  try {
      
      let updates = req.body
      
      let jobToUpdate = await models.jobs.findOne({
          where:{
              id: req.params.id
          }
      })
      let final = await jobToUpdate.update(updates)
      res.json({final})
    
    } catch (error) {
      res.json({error})
  }
}



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

app.put('/jobs/:id',updateJob)

app.post("/jobs", createJobs)

app.delete('/jobs/:id', deleteJob)

app.get('/jobs', getAllJobs)

app.get('/', (req, res) => {
  res.send('')
})


