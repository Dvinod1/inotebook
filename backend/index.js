const connecToMongo = require('./db');
const express = require('express')



connecToMongo();
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Vinod!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})