const mongoose = require('mongoose')

const UserSchema = require('./schema/User')

const { MONGO_URI } = process.env

if (!MONGO_URI) {
  console.error('Env varaible "MONGO_URI" is required to run this app')
  process.exit(-1)
}

mongoose.model('User', UserSchema)

module.exports = {
  async connectDatabase() {
    try {
      const res = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log(
        `MongoDB connected to DB ${res.connections[0].getClient().s.options.dbName}` +
          ` at ${res.connections[0].getClient().s.options.srvHost}`
      )
      // console.log(res.connections)
    } catch (err) {
      console.error('Error connecting to MongoDB')
      console.error(err)
      process.exit(-1)
    }
  },
  async disconnectDatabase() {
    try {
      await mongoose.disconnect()
      console.log('MongoDB disconnected')
    } catch (err) {
      console.error('Error disconnecting from MongoDB')
      console.error(err)
      process.exit(-1)
    }
  },
}