const {
  isValidEligibilityCheckBody,
} = require('../validations/body.validations')

const validateEligibilityCheckBody = (req, res, next) => {
  if (!isValidEligibilityCheckBody(req.body)) {
    return res.status(400).json('Invalid request. Check the fields!')
  }

  return next()
}

module.exports = {
  validateEligibilityCheckBody,
}
