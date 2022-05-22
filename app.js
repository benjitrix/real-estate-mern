const express = require('express')
const app = express()
require('dotenv').config()

const userRouter = require('./routes/user')
const estateRouter = require('./routes/estate')
const emailRouter = require('./routes/email')
const queryRouter = require('./routes/query')
const adminRouter = require('./routes/admin')
const purchaseRouter = require('./routes/purchase')
const stripeRouter = require('./routes/stripe')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authenticateUser = require('./middleware/auth')

const { getAllEstates } = require('./controllers/estate')

// json middleware
app.use(express.json())

// routes middleware
app.use('/api/v1/user', userRouter)
app.use('/api/v1/estate', authenticateUser, estateRouter)
app.use('/api/v1/estate/purchase', authenticateUser, purchaseRouter)
app.use('/api/v1/estates/all', getAllEstates)
app.use('/api/v1/query/estates', queryRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/email', emailRouter)
app.use('/api/v1/stripe', stripeRouter)

// route not-found, error handler middleware
app.use(notFound)
app.use(errorHandlerMiddleware)

// test routes
app.get('/', (req, res) => {
  res. send('Bye bye')
})
app.get('/greeting', (req, res) => {
  res.json({ greeting: 'hello' })
})

// start db, server
const port = process.env.PORT || 5000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(console.log('Connected to DB: REAL ESTATE API...'))
    // server
    app.listen(port, () => {
    console.log(`Real-Estate SERVER listening on port: ${port}`)
    })
  } catch (error) {
    console.log("Server unable to connect: ", error)
  }
}

start()