const express = require('express')
const PORT = process.env.PORT || 4242

const app = express()

app.use(express.json())

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
