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
    monofasica: averageConsumption > 400,
    bifasica: averageConsumption > 500,
    trifasica: averageConsumption > 750,
  }

  return minimiumConsumptionMatch[connectionType]
}

module.exports = {
  isEligibleConsumptionClass,
  isEligibleTariffModality,
  isEligibleMinimumConsumption,
}
