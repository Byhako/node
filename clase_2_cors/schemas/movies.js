const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a string'
  }),
  director: z.string(),
  year: z.number().int().positive().min(1900).max(3000),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url(),
  duration: z.number().int().min(0),
  genre: z.array(z.enum(['comedy', 'drama', 'action', 'horror', 'adventure', 'romance', 'crime', 'animation', 'documentary', 'sci-fi', 'thriller']))
})

function validateMovie(movie) {
  return movieSchema.safeParse(movie)
}

function validateParcialMovie(movie) {
  return movieSchema.partial().safeParse(movie)
}

module.exports = { validateParcialMovie, validateMovie }
