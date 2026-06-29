const express = require('express')
const app = express()
app.use(express.json())

const compuestos = {}

app.post('/get', (req, res) => {
  const { clave } = req.body
  if (compuestos[clave]) {
    res.json({ encontrado: true, compuesto: compuestos[clave] })
  } else {
    res.json({ encontrado: false })
  }
})

app.post('/save', (req, res) => {
  const { clave, compuesto } = req.body
  compuestos[clave] = compuesto
  res.json({ ok: true })
})

app.listen(3000, () => console.log('Servidor corriendo'))
