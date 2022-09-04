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
      services.isEligibleMinimumConsumption('monofasico', consumptionHistory)
    ).toBe(true)
  })

  it('should be an eligible minimum consumption for two-phase connection', () => {
    const consumptionHistory = [
      3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
    ]

    expect(
      services.isEligibleMinimumConsumption('bifasico', consumptionHistory)
    ).toBe(true)
  })

  it('should be an eligible minimum consumption for three-phase connection', () => {
    const consumptionHistory = [
      3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
    ]

    expect(
      services.isEligibleMinimumConsumption('trifasico', consumptionHistory)
    ).toBe(true)
  })

  it('should return annual CO2 savings for 12 consumption records', () => {
    const consumptionHistory = [
      3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
    ]

    expect(services.calculateCO2AnnualSavings(consumptionHistory)).toBe(5553.24)
  })

  it('should return annual CO2 savings for 3 consumption records', () => {
    const consumptionHistory = [3878, 9760, 5976]

    expect(services.calculateCO2AnnualSavings(consumptionHistory)).toBe(6590.3)
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

  it('should not be an eligible minimum consumption for single-phase connection', () => {
    const consumptionHistory = [
      300, 320, 399, 305, 421, 442, 499, 345, 353, 315, 410, 555,
    ]

    expect(
      services.isEligibleMinimumConsumption('monofasico', consumptionHistory)
    ).toBe(false)
  })

  it('should not be an eligible minimum consumption for two-phase connection', () => {
    const consumptionHistory = [
      300, 400, 499, 600, 500, 549, 543, 345, 453, 534, 410, 555,
    ]

    expect(
      services.isEligibleMinimumConsumption('bifasico', consumptionHistory)
    ).toBe(false)
  })

  it('should not be an eligible minimum consumption for three-phase connection', () => {
    const consumptionHistory = [
      1004, 900, 499, 600, 500, 549, 543, 345, 453, 534, 1000, 555,
    ]

    expect(
      services.isEligibleMinimumConsumption('trifasico', consumptionHistory)
    ).toBe(false)
  })

  it('should return one ineligible reason', () => {
    const [
      eligibleConsumptionClass,
      eligibleTarfiffModallity,
      eligibleMinimumConsumption,
    ] = [true, false, true]

    expect(
      services.determineIneligibilityReasons(
        eligibleConsumptionClass,
        eligibleTarfiffModallity,
        eligibleMinimumConsumption
      )
    ).toEqual(['Modalidade tarifária não aceita'])
  })

  it('should return two ineligible reasons', () => {
    const [
      eligibleConsumptionClass,
      eligibleTarfiffModallity,
      eligibleMinimumConsumption,
    ] = [false, false, true]

    expect(
      services.determineIneligibilityReasons(
        eligibleConsumptionClass,
        eligibleTarfiffModallity,
        eligibleMinimumConsumption
      )
    ).toEqual([
      'Classe de consumo não aceita',
      'Modalidade tarifária não aceita',
    ])
  })

  it('should return three ineligible reasons', () => {
    const [
      eligibleConsumptionClass,
      eligibleTarfiffModallity,
      eligibleMinimumConsumption,
    ] = [false, false, false]

    expect(
      services.determineIneligibilityReasons(
        eligibleConsumptionClass,
        eligibleTarfiffModallity,
        eligibleMinimumConsumption
      )
    ).toEqual([
      'Classe de consumo não aceita',
      'Modalidade tarifária não aceita',
      'Consumo muito baixo para tipo de conexão',
    ])
  })
})
