const express = require('express')
const fs = require('fs')

const app = express()
app.disable('x-powered-by')

const PORT = 4000

app.use((req, res, next) => {
  console.log('Middleware')
  if (req.method !== 'POST') return next()

  let body = ''

  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    // Mutar la respuesta agregando data en el body
    req.body = data
    next()
  })
})

app.get('/', (req, res) => {
  res.status(200).send('Welcome to my website!')
})

app.post('/image', (req, res) => {
  fs.readFile('image.jpg', (err, data) => {
    if (err) {
      res.status(500).send('Error reading image')
    } else {
      res.status(200).send(data)
    }
  })
})

app.use((req, res, next) => {
  res.status(404).send('Not found')
})

app.listen(PORT, () => {
  console.info(`Server listening on http://localhost:${PORT}`)
})
