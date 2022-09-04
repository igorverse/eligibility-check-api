const express = require('express')
const eligibilityCheckController = require('../controllers/eligibilityCheck.controllers')
const {
  validateEligibilityCheckBody,
} = require('../middlewares/eligibilityCheck.middlewares')

const eligibilityCheckRouter = express.Router()

eligibilityCheckRouter.post(
  '/check-eligibility',
  validateEligibilityCheckBody,
  (req, res) => {
    eligibilityCheckController.handle(req, res)
  }
)

module.exports = eligibilityCheckRouter
