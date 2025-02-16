const http = require('node:http')
const fs = require('node:fs')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
  console.log(req.url)

  if (req.url === '/') {
    res.end('Welcome to my website!')
  } else if (req.url === '/about') {
    res.end('About page')
  } else if (req.url === '/image') {
    fs.readFile('image.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('Error reading image')
      } else {
        res.statusCode = 200
        res.writeHead(200, { 'Content-Type': 'image/jpg' })
        res.end(data)
      }
    })
  } else {
    res.end('Not found')
  }
})

server.listen(4000, () => {
  console.info(`Server listening on http://localhost:${server.address().port}`)
})
