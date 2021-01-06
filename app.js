require("dotenv").config()
const express = require("express")
const app = express()
const { Pool } = require('pg')
const port = process.env.PORT || 3000 // added for heroku deploy to work

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
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

app.get("/caffine", (req, res) => {
  res.status(200).send('*sips*\nthanks')
})

app.get("/test", async(req, res) => {
  const result = await query('SELECT * FROM post', [])
  res.status(200).json(result)
})

app.listen(port, () => console.log(`\n----> http://localhost:${port}\n`));