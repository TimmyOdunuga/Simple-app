require('./config')
const { connectDatabase } = require('./mongodb')
const { startServer } = require('./express')

async function main() {
  try {
    // Init MongoDB
    await connectDatabase()
    // Init express routes
    startServer()
  } catch (err) {
    console.error(err)
    process.exit(-1)
  }
}

main()