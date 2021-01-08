require("dotenv").config()
const express = require("express")
const { Pool } = require('pg')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000 // added for heroku deploy to work

// middleware
app.use(cors())

const pool_home = new Pool({
  connectionString: process.env.HOME_URI,
  ssl: { rejectUnauthorized: false },
  max: 19, // 10 default
  connectionTimeoutMillis: 10000, // 0 default
  idleTimeoutMillis: 10000, // 10000 default
})
const pool_market = new Pool({
  connectionString: process.env.MARKET_URI,
  ssl: { rejectUnauthorized: false },
  max: 19, // 10 default
  connectionTimeoutMillis: 10000, // 0 default
  idleTimeoutMillis: 10000, // 10000 default
})
const pool_social = new Pool({
  connectionString: process.env.SOCIAL_URI,
  ssl: { rejectUnauthorized: false },
  max: 19, // 10 default
  connectionTimeoutMillis: 10000, // 0 default
  idleTimeoutMillis: 10000, // 10000 default
})

async function query(q, values, pool) {
  return await pool.query(q, values)
    .then(res => {
      return res
    })
    .catch(err => {
      console.log('query error', err)
      return {err: err.message} // passes to nearest error handler
    })
}

app.get("/", async(req, res) => {
  res.status(200).send('try an endpoint')
})

app.get("/verify", async(req, res) => {
  console.log('is this a key?', req.query)
  try {
    if (req.query === process.env.POOL_KEY) {
      res.status(200).json(result)
    } else {
      res.status(403).send('unauthorized')
    }
  } catch(err) {
    res.status(400).send(JSON.stringify(err))
  }
})

app.get("/home", async(req, res) => {
  // use api key
  if (true) {
    const result = await query('SELECT * FROM post', [], pool_home)
    res.status(200).json(result)
  } else {
    res.status(403).send('unauthorized')
  }
})
app.get("/market", async(req, res) => {
  // use api key
  if (true) {
    const result = await query('SELECT * FROM post', [], pool_market)
    res.status(200).json(result)
  } else {
    res.status(403).send('unauthorized')
  }
  if (true) {
    const result = await query('SELECT * FROM post', [], pool_social)
    res.status(200).json(result)
  } else {
    res.status(403).send('unauthorized')
  }
})
app.get("/social", async(req, res) => {
  // use api key
  if (true) {
    const result = await query('SELECT * FROM post', [], pool_social)
    res.status(200).json(result)
  } else {
    res.status(403).send('unauthorized')
  }
})

app.listen(port, () => console.log(`\n----> http://localhost:${port}\n`));

/*
only get 10000 rows
- can have multiple pg which are pooled
recieve
query, values, apikey, which db
return db result

*/