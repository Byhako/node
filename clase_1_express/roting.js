const http = require('node:http')

const server = http.createServer((req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/':
          res.end('Welcome to my website!')
          break
        case '/about':
          res.end('About page')
          break
        default:
          res.statusCode = 404
          res.end('Not found')
          break
      }
      break

    case 'POST': {
      let body = ''

      req.on('data', (chunk) => {
        body += chunk.toString()
      })

      req.on('end', () => {
        const data = JSON.parse(body)
        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
        res.end(JSON.stringify(data))
      })

      break
    }

    default:
      res.statusCode = 405
      res.end('Method not allowed')
      break
  }
})

server.listen(4000, () => {
  console.info(`Server listening on http://localhost:${server.address().port}`)
})
