const {
  isEligibleConsumptionClass,
  isEligibleTariffModality,
  isEligibleMinimumConsumption,
  determineIneligibilityReasons,
  calculateCO2AnnualSavings,
} = require('../services/eligibilityCheck.services')

const handle = (req, res) => {
  const {
    tipoDeConexao,
    classeDeConsumo,
    modalidadeTarifaria,
    historicoDeConsumo,
  } = req.body

  const eligibleConsumptionClass = isEligibleConsumptionClass(classeDeConsumo)
  const eligibleTarfiffModallity = isEligibleTariffModality(modalidadeTarifaria)
  const eligibleMinimumConsumption = isEligibleMinimumConsumption(
    tipoDeConexao,
    historicoDeConsumo
  )

  if (
    !eligibleConsumptionClass ||
    !eligibleTarfiffModallity ||
    !eligibleMinimumConsumption
  ) {
    return res.json({
      elegivel: false,
      razoesInelegibidade: [
        ...determineIneligibilityReasons(
          eligibleConsumptionClass,
          eligibleTarfiffModallity,
          eligibleMinimumConsumption
        ),
      ],
    })
  }

  return res.json({
    elegivel: true,
    economiaAnualDeCO2: calculateCO2AnnualSavings(historicoDeConsumo),
  })
}

module.exports = {
  handle,
}
