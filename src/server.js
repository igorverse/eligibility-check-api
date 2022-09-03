const express = require('express')
const swaggerUi = require('swagger-ui-express')
const documentation = require('./openapi.json')

const PORT = process.env.PORT || 4242

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(documentation))

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
