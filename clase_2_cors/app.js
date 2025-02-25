const express = require('express')
const crypto = require('node:crypto')
// const cors = require('cors')
const movies = require('./movies.json')
const { validateMovie, validateParcialMovie } = require('./schemas/movies')


const PORT = 4000
const app = express()
app.disable('x-powered-by')
// app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/movies', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')

  const { genre } = req.query
  const filteredMovies = movies.filter(
    movie => !genre || movie.some(g => g.toLowerCase() === genre.toLowerCase())
  )
  res.json(filteredMovies)
})

app.get('/movies/:id', (req, res) => {
  const id = req.params.id
  const movie = movies.find(movie => movie.id === id)
  if (movie) {
    res.json(movie)
  } else {
    res.status(404).json({ error: 'Movie not found' })
  }
})

app.delete('/movies/:id', (req, res) => {
  // cors pre flight
  res.header('Access-Control-Allow-Origin', '*')

  const id = req.params.id
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    res.status(404).json({ error: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)
  res.json({ success: true })
})

app.options('/movies/:id', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.status(200).end()
})

app.post('/movies', (req, res) => {
  
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  movies.push(newMovie)
  res.statusCode(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const result = validateParcialMovie(req.body)

  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }

  const id = req.params.id
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    res.status(404).json({ error: 'Movie not found' })
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updatedMovie

  res.json(updatedMovie)
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
