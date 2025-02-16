const path = require('node:path')

// unir rutas
const filePath = path.join('curso', 'node', 'clase_0', 'index.js')
console.log(filePath)

console.log(path.basename(filePath))
console.log('filename', path.basename(filePath, '.js'))
console.log('ext', path.extname(filePath))
