const isElegibleConsumptionClass = (consumptionClass) => {
  const elegiblesConsumptionClasses = ['comercial', 'residencial', 'industrial']

  return elegiblesConsumptionClasses.includes(consumptionClass)
}

const isElegibleTariffModality = (tariffModality) => {
  const elegibleTarfiffModalities = ['convencional', 'branca']

  return elegibleTarfiffModalities.includes(tariffModality)
}

const isElegibleMinimumConsumption = (connectionType, consumptionHistory) => {
  const averageConsumption =
    consumptionHistory.reduce((acc, curr) => acc + curr) /
    consumptionHistory.length

  const minimiumConsumtionMatch = {
    monofasica: averageConsumption > 400,
    bifasica: averageConsumption > 500,
    trifasica: averageConsumption > 750,
  }

  return minimiumConsumtionMatch[connectionType]
}

module.exports = {
  isElegibleConsumptionClass,
  isElegibleTariffModality,
  isElegibleMinimumConsumption,
}
