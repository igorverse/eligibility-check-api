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
    ['monofasico', 'bifasico', 'trifasico'].includes(tipoDeConexao)

  if (!isValidConnectionType) return false

  const isValidConsumptionClass =
    classeDeConsumo &&
    [
      'residencial',
      'industrial',
      'comercial',
      'rural',
      'poderPublico',
    ].includes(classeDeConsumo)

  if (!isValidConsumptionClass) return false

  const isValidTarfiffModality =
    modalidadeTarifaria &&
    ['azul', 'branca', 'verde', 'convencional'].includes(modalidadeTarifaria)

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
