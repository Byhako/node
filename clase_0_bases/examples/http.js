const http = require('node:http')

const server = http.createServer((req, res) => {
  res.end('Hola Ruben')
})

server.listen(4000, () => {
  console.info(`Server listening on http://localhost:${server.address().port}`)
})
