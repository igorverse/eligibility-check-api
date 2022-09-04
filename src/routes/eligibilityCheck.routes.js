const express = require('express')
const {
  validateEligibilityCheckBody,
} = require('../middlewares/eligibilityCheck.middlewares')

const eligibilityCheckRouter = express.Router()

eligibilityCheckRouter.post(
  '/check-eligibility',
  validateEligibilityCheckBody,
  (req, res) => {
    return res.json('not implementd yet')
  }
)

module.exports = eligibilityCheckRouter
