const express = require('express')
const { Client } = require('pg')
const app = express()
app.use(express.json())

const client = new Client({
  connectionString: process.env.DATABASE_URL
})
client.connect()

client.query(`CREATE TABLE IF NOT EXISTS compuestos (
  clave TEXT PRIMARY KEY,
  data JSONB NOT NULL
)`)

app.post('/get', async (req, res) => {
  const { clave } = req.body
  const result = await client.query('SELECT data FROM compuestos WHERE clave = $1', [clave])
  if (result.rows.length > 0) {
    res.json({ encontrado: true, compuesto: result.rows[0].data })
  } else {
    res.json({ encontrado: false })
  }
})

app.post('/save', async (req, res) => {
  const { clave, compuesto } = req.body
  await client.query('INSERT INTO compuestos (clave, data) VALUES ($1, $2) ON CONFLICT (clave) DO NOTHING', [clave, JSON.stringify(compuesto)])
  res.json({ ok: true })
})

app.listen(process.env.PORT || 3000, () => console.log('Servidor corriendo'))
