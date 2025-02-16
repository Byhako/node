const fs = require('node:fs')

const stats = fs.statSync('./file.txt')

console.log(
  stats.isFile(),
  stats.isDirectory(),
  stats.isSymbolicLink(),
  stats.size,
)

// sincrono
const text = fs.readFileSync('./file.txt', 'utf-8')

console.log(text)

// asincrono
fs.readFile('./file2.txt', 'utf-8', (err, text) => {
  console.log(text)
})

// promesas
const fsp = require('node:fs/promises')

fsp.readFile('./file.txt', 'utf-8')
  .then(text => console.log(text))

// convertir callback a promesa
const { promisify } = require('node:util')

const readFile = promisify(fs.readFile)

readFile('./file.txt', 'utf-8')
  .then(text => console.log(text))


// en paralelo
Promise.all([
  fsp.readFile('./file.txt', 'utf-8'),
  fsp.readFile('./file2.txt', 'utf-8')
]).then(([text1, text2]) => {
  console.log(text1)
  console.log(text2)
})
