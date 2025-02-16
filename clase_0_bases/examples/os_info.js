const os = require('node:os')

console.log('Informacion del sistema operativo')
console.log('---------------------------------')

console.log('Nombre del OS: ', os.platform())
console.log('Version: ', os.release())
console.log('Arquitectura: ', os.arch())
console.log('cpus: ', os.cpus())
console.log('Memoria total: ', os.totalmem() / 1024 / 1024)
console.log('Memoria libre: ', os.freemem() / 1024 / 1024)
console.log('uptime: ', os.uptime() / 60 / 60)

