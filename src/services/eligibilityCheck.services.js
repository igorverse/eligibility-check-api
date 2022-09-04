const isEligibleConsumptionClass = (consumptionClass) => {
  const eligiblesConsumptionClasses = ['comercial', 'residencial', 'industrial']

  return eligiblesConsumptionClasses.includes(consumptionClass)
}

const isEligibleTariffModality = (tariffModality) => {
  const eligibleTarfiffModalities = ['convencional', 'branca']

  return eligibleTarfiffModalities.includes(tariffModality)
}

const isEligibleMinimumConsumption = (connectionType, consumptionHistory) => {
  const averageConsumption =
    consumptionHistory.reduce((acc, curr) => acc + curr) /
    consumptionHistory.length

  const minimiumConsumptionMatch = {
    monofasico: averageConsumption > 400,
    bifasico: averageConsumption > 500,
    trifasico: averageConsumption > 750,
  }

  return minimiumConsumptionMatch[connectionType]
}

const determineIneligibilityReasons = (
  isEligibleConsumptionClass,
  isEligibleTariffModality,
  isEligibleMinimumConsumption
) => {
  const allIneligibilityReasons = [
    'Classe de consumo não aceita',
    'Modalidade tarifária não aceita',
    'Consumo muito baixo para tipo de conexão',
  ]

  const ineligibilityReasons = []

  if (!isEligibleConsumptionClass)
    ineligibilityReasons.push(allIneligibilityReasons[0])
  if (!isEligibleTariffModality)
    ineligibilityReasons.push(allIneligibilityReasons[1])
  if (!isEligibleMinimumConsumption)
    ineligibilityReasons.push(allIneligibilityReasons[2])

  return ineligibilityReasons
}

const calculateCO2AnnualSavings = (consumptionHistory) => {
  const averageConsumption =
    consumptionHistory.reduce((acc, curr) => acc + curr) /
    consumptionHistory.length

  const averageEmissionFor100kWh = (averageConsumption * 84) / 1000

  const annualCO2Savings = (averageEmissionFor100kWh * 12).toFixed(2)

  return Number(annualCO2Savings)
}

module.exports = {
  isEligibleConsumptionClass,
  isEligibleTariffModality,
  isEligibleMinimumConsumption,
  determineIneligibilityReasons,
  calculateCO2AnnualSavings,
}
