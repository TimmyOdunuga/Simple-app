const path = require('path')
const fs = require('fs')

const envPath = path.join(__dirname, '.env')
const envExists = fs.existsSync(envPath)
if (!envExists) {
  console.warn(`Please include a .env file with the directory ${envPath}`)
  process.exit(0)
} else {
  require('dotenv').config({ path: envPath })
}

const envSchema = {
  NODE_ENV: 'development',
  PORT: 5000,
  MONGO_URI: 'mongodb://localhost:27017/testDB',
}

for (const field in envSchema) {
  if (process.env[field] === undefined) {
    console.warn(`Env variable "${field}" not found. Setting default of "${envSchema[field]}".`)
    process.env[field] = envSchema[field]
  }
}

module.exports = {
  INTERNAL_IPS: ['::1', '127.0.0.1', '10.124.0.*'],
  DEVELOPER_IPS: {
    'Timmy Odunuga': '73.119.13.80',
  },
}