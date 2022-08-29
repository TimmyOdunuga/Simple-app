const http = require('http')
const path = require('path')
const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
var bodyParser = require('body-parser')


const { PORT, NODE_ENV } = process.env

const app = express()
app.use(morgan('combined'))


if (NODE_ENV !== 'production') {
  app.use(cors())
}

//handle error
const handleExpressError = (err, req, res, next) => {
    if (!err) return next()
    const msg = err?.response?.data?.msg || err.message
    const stack = err?.response?.data?.stack || err.stack
    const status = err?.response?.status || 500
    if (err.isAxiosError) {
      console.log(`Request Error: ${msg}`)
      console.log(`At ${err?.request?.host}`)
    } else {
      console.error(msg)
      console.error(stack)
    }
    return res.status(status).send({
      msg,
      isAxiosError: err.isAxiosError,
      stack: NODE_ENV !== 'development' ? [] : err.stack.split('\n').map((line) => line.trim()),
      err:
        err.isAxiosError && NODE_ENV === 'development'
          ? {
              at: err?.request?.host,
              status: err?.response?.status,
              data: err?.response?.data,
            }
          : undefined,
    })
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// Site avaliable api endpoints
app.use('/api/user', express.json({ limit: '921600mb' }), require('./user'))

app.use(handleExpressError)

app.use('/', express.static(path.join(__dirname, '../../public')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public/index.html'))
})

module.exports = {
  startServer() {
    http.createServer(app).listen(PORT)
    console.log(`HTTP server listening on port ${PORT}`)
  },
}