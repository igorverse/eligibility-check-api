const express = require('express')

const eligibilityCheckRouter = express.Router()

eligibilityCheckRouter.post('/check-eligibility', (req, res, next) => {
  throw 'Not implemented yet'
})

module.exports = eligibilityCheckRouter
