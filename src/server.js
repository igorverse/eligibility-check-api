const express = require('express')
const dotenv = require('dotenv')
const swaggerUi = require('swagger-ui-express')
const documentation = require('./openapi.json')
const eligibilityCheckRouter = require('./routes/eligibilityCheck.routes')

dotenv.config()
const PORT = process.env.PORT || 4242

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(documentation))

app.use('/v1', eligibilityCheckRouter)

app.get('/', (req, res, next) => {
  return res.redirect('/api-docs')
})

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))

module.exports = {
  app,
}
