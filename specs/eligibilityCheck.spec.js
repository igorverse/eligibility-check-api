const validations = require('../src/validations/eligibilityCheck.validations')

describe('Customers with eligibility', () => {
  it('should be an elegible consumption class', () => {
    const elegiblesConsumptionClasses = [
      'comercial',
      'residencial',
      'industrial',
    ]

    for (const consumptionClass of elegiblesConsumptionClasses) {
      expect(validations.isElegibleConsumptionClass(consumptionClass)).toBe(
        true
      )
    }
  })

  it('should be an elegible tariff modality', () => {
    const elegibleTarfiffModalities = ['convencional', 'branca']

    for (const tariffModality of elegibleTarfiffModalities) {
      expect(validations.isElegibleTariffModality(tariffModality)).toBe(true)
    }
  })

  it('should be an elegible minimum consumption for single-phase connection', () => {
    const consumptionHistory = [
      3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
    ]

    expect(
      validations.isElegibleMinimumConsumption('monofasica', consumptionHistory)
    ).toBe(true)
  })

  it('should be an elegible minimum consumption for two-phase connection', () => {
    const consumptionHistory = [
      3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
    ]

    expect(
      validations.isElegibleMinimumConsumption('bifasica', consumptionHistory)
    ).toBe(true)
  })

  it('should be an elegible minimum consumption for three-phase connection', () => {
    const consumptionHistory = [
      3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
    ]

    expect(
      validations.isElegibleMinimumConsumption('trifasica', consumptionHistory)
    ).toBe(true)
  })
})

describe('Customers without eligibility', () => {
  it('should not be an elegible consumption class', () => {
    const elegiblesConsumptionClasses = ['rural', 'poderPublico']

    for (const consumptionClass of elegiblesConsumptionClasses) {
      expect(validations.isElegibleConsumptionClass(consumptionClass)).toBe(
        false
      )
    }
  })

  it('should not be an elegible tariff modality', () => {
    const elegibleTarfiffModalities = ['azul', 'verde']

    for (const tariffModality of elegibleTarfiffModalities) {
      expect(validations.isElegibleTariffModality(tariffModality)).toBe(false)
    }
  })

  it('should be an elegible minimum consumption for single-phase connection', () => {
    const consumptionHistory = [
      300, 320, 399, 305, 421, 442, 499, 345, 353, 315, 410, 555,
    ]

    expect(
      validations.isElegibleMinimumConsumption('monofasica', consumptionHistory)
    ).toBe(false)
  })

  it('should be an elegible minimum consumption for two-phase connection', () => {
    const consumptionHistory = [
      300, 400, 499, 600, 500, 549, 543, 345, 453, 534, 410, 555,
    ]

    expect(
      validations.isElegibleMinimumConsumption('bifasica', consumptionHistory)
    ).toBe(false)
  })

  it('should be an elegible minimum consumption for three-phase connection', () => {
    const consumptionHistory = [
      1004, 900, 499, 600, 500, 549, 543, 345, 453, 534, 1000, 555,
    ]

    expect(
      validations.isElegibleMinimumConsumption('trifasica', consumptionHistory)
    ).toBe(false)
  })
})
