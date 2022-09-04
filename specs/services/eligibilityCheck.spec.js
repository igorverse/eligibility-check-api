const services = require('../../src/services/eligibilityCheck.services')

describe('Customers with eligibility', () => {
  it('should be an eligible consumption class', () => {
    const eligiblesConsumptionClasses = [
      'comercial',
      'residencial',
      'industrial',
    ]

    for (const consumptionClass of eligiblesConsumptionClasses) {
      expect(services.isEligibleConsumptionClass(consumptionClass)).toBe(true)
    }
  })

  it('should be an eligible tariff modality', () => {
    const eligibleTarfiffModalities = ['convencional', 'branca']

    for (const tariffModality of eligibleTarfiffModalities) {
      expect(services.isEligibleTariffModality(tariffModality)).toBe(true)
    }
  })

  it('should be an eligible minimum consumption for single-phase connection', () => {
    const consumptionHistory = [
      3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
    ]

    expect(
      services.isEligibleMinimumConsumption('monofasica', consumptionHistory)
    ).toBe(true)
  })

  it('should be an eligible minimum consumption for two-phase connection', () => {
    const consumptionHistory = [
      3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
    ]

    expect(
      services.isEligibleMinimumConsumption('bifasica', consumptionHistory)
    ).toBe(true)
  })

  it('should be an eligible minimum consumption for three-phase connection', () => {
    const consumptionHistory = [
      3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
    ]

    expect(
      services.isEligibleMinimumConsumption('trifasica', consumptionHistory)
    ).toBe(true)
  })
})

describe('Customers without eligibility', () => {
  it('should not be an eligible consumption class', () => {
    const eligiblesConsumptionClasses = ['rural', 'poderPublico']

    for (const consumptionClass of eligiblesConsumptionClasses) {
      expect(services.isEligibleConsumptionClass(consumptionClass)).toBe(false)
    }
  })

  it('should not be an eligible tariff modality', () => {
    const eligibleTarfiffModalities = ['azul', 'verde']

    for (const tariffModality of eligibleTarfiffModalities) {
      expect(services.isEligibleTariffModality(tariffModality)).toBe(false)
    }
  })

  it('should be an eligible minimum consumption for single-phase connection', () => {
    const consumptionHistory = [
      300, 320, 399, 305, 421, 442, 499, 345, 353, 315, 410, 555,
    ]

    expect(
      services.isEligibleMinimumConsumption('monofasica', consumptionHistory)
    ).toBe(false)
  })

  it('should be an eligible minimum consumption for two-phase connection', () => {
    const consumptionHistory = [
      300, 400, 499, 600, 500, 549, 543, 345, 453, 534, 410, 555,
    ]

    expect(
      services.isEligibleMinimumConsumption('bifasica', consumptionHistory)
    ).toBe(false)
  })

  it('should be an eligible minimum consumption for three-phase connection', () => {
    const consumptionHistory = [
      1004, 900, 499, 600, 500, 549, 543, 345, 453, 534, 1000, 555,
    ]

    expect(
      services.isEligibleMinimumConsumption('trifasica', consumptionHistory)
    ).toBe(false)
  })
})
