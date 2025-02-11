const fs = require('node:fs/promises')
const path = require('node:path')

const folder = process.argv[2] ?? '.'

async function ls(directory) {
  let files = []
  try {
    files = await fs.readdir(directory)
  } catch (err) {
    console.error('Error leyendo folder.', err)
    process.exit(1)
  }

  const filePromises = files.map(async file => {
    const filePath = path.join(directory, file)
    let stats

    try {
      stats = await fs.stat(filePath)
    } catch (error) {
      console.error('Error obteniendo información')
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'

    const filesize = stats.size
    const fileModified = stats.mtime.toLocaleString()

    return `${fileType} ${file.padEnd(20)} ${filesize.toString().padStart(10)} ${fileModified.padStart(30)}`
  })

  const filesInfo = await Promise.all(filePromises)

  console.log('-'.repeat(65))
  console.log(`T ${'name'.padEnd(20)} ${'size'.padStart(10)} ${'Modified'.padStart(20)}`)
  console.log('-'.repeat(65))

  filesInfo.forEach(file => console.log(file))
  console.log(' ')
}

ls(folder)
