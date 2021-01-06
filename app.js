require("dotenv").config()
const express = require("express")
const { Pool } = require('pg')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000 // added for heroku deploy to work

// middleware
app.use(cors())

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 19, // 10 default
  connectionTimeoutMillis: 10000, // 0 default
  idleTimeoutMillis: 10000, // 10000 default
})

async function query(q, values) {
  return await pool.query(q, values)
    .then(res => {
      return res
    })
    .catch(err => {
      console.log('query error', err)
      return {err: err.message} // passes to nearest error handler
    })
}

app.get("/", (req, res) => {
  res.status(200).send('try an endpoint')
})

app.get("/loaderio-ba7db8e3e245c156d37018ba8f199290", (req, res) => {
  res.status(200).send('loaderio-ba7db8e3e245c156d37018ba8f199290')
})
app.get("/caffine", (req, res) => {
  res.status(200).send('*sips*\nthanks')
})

app.get("/test", async(req, res) => {
  const result = await query('SELECT * FROM post', [])
  res.status(200).json(result)
})

app.listen(port, () => console.log(`\n----> http://localhost:${port}\n`));