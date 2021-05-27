const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const rowdy = require('rowdy-logger')


const routesReport = rowdy.begin(app)

app.use(require('morgan')('tiny'))
app.use(require('cors')())
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
  routesReport.print()
})

const models = require('./models');
const user = require('./models/user');

app.post('/users', (req, res) => {
  models.user.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  .then((user) => {
    res.json({message: 'success', user})
  })
  .catch((error) => {
    res.status(400).json({ error: error.messgae })
  })
})

app.post('/users/login', (req, res) => {
  models.user.findOne({
    where: { email: req.body.email }
  }).then((foundUser) => {
    if (foundUser && foundUser.password === req.body.password) {
      res.json({ messgae: 'success', user: foundUser })
    } else {
      res.status(401).json({ message: 'login failed' })
    }
  }).catch((error) => {
    res.status(400).json({ error: error.messgae })
  })
})

app.get('/users/verify', (req, res) => {
  models.user.findOne({
    where: { id: req.headers.authorization}
  })
  .then((user) => {
    if (user) {
      res.json({ user })
    } else {
      res.status(404).json({ message: 'user not found' })
    }
  })
  .catch((error) => {
    res.json({ error })
  })
})

const createJobs = async (req, res) => {
  console.log(req.body)
  try {
    let user = await models.user.findOne({
      where: {id: req.headers.authorization}
    })
    let newJob = await models.jobs.create({
      jobtitle: req.body.jobtitle,
      jobdescription: req.body.description, 
      companyname: req.body.companyname,
      salary: req.body.salary,
      submitDate: req.body.submitDate,
      contactInfo: req.body.contactInfo
    })
    await user.addJob(newJob)
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
    let user = await models.user.findOne({
      where: {id: req.headers.authorization},
    
    })
    let jobs = await user.getJobs()
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


