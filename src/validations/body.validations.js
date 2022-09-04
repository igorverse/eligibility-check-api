const isValidEligibilityCheckBody = (body) => {
  const {
    numeroDoDocumento,
    tipoDeConexao,
    classeDeConsumo,
    modalidadeTarifaria,
    historicoDeConsumo,
  } = body

  const isValidDocumentNumber =
    numeroDoDocumento &&
    (/^\d{11}$/.test(numeroDoDocumento) || /^\d{14}$/.test(numeroDoDocumento))

  if (!isValidDocumentNumber) return false

  const isValidConnectionType =
    tipoDeConexao &&
    ['monofasico', 'bifasico', 'trifasico'].includes(
      tipoDeConexao.toLowerCase()
    )

  if (!isValidConnectionType) return false

  const isValidConsumptionClass =
    classeDeConsumo &&
    [
      'residencial',
      'industrial',
      'comercial',
      'rural',
      'poderPublico',
    ].includes(classeDeConsumo.toLowerCase())

  if (!isValidConsumptionClass) return false

  const isValidTarfiffModality =
    modalidadeTarifaria &&
    ['azul', 'branca', 'verde', 'convencional'].includes(
      modalidadeTarifaria.toLowerCase()
    )

  if (!isValidTarfiffModality) return false

  const isValidConsumptionHistory =
    historicoDeConsumo &&
    historicoDeConsumo.length >= 3 &&
    historicoDeConsumo.length <= 12 &&
    historicoDeConsumo.every(
      (electricityConsumption) => electricityConsumption >= 0
    )

  if (!isValidConsumptionHistory) return false

  return true
}

module.exports = {
  isValidEligibilityCheckBody,
}
