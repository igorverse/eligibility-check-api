const validations = require('../../src/validations/body.validations')

describe('valid bodies', () => {
  it('should be a valid eligibity check body', () => {
    const validBody = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
      ],
    }

    expect(validations.isValidEligibilityCheckBody(validBody)).toBe(true)
  })
})

describe('invalid bodies', () => {
  it('should be an invalid eligibity check body, because of invalid document number', () => {
    const invalidBody = {
      numeroDoDocumento: '1404173770',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
      ],
    }

    expect(validations.isValidEligibilityCheckBody(invalidBody)).toBe(false)
  })

  it('should be an invalid eligibity check body, because of invalid connection type', () => {
    const invalidBody = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'quadrifasico',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
      ],
    }

    expect(validations.isValidEligibilityCheckBody(invalidBody)).toBe(false)
  })

  it('should be an invalid eligibity check body, because of invalid consumption class', () => {
    const invalidBody = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'especial',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
      ],
    }

    expect(validations.isValidEligibilityCheckBody(invalidBody)).toBe(false)
  })

  it('should be an invalid eligibity check body, because of invalid tariff modality', () => {
    const invalidBody = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'amarela',
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
      ],
    }

    expect(validations.isValidEligibilityCheckBody(invalidBody)).toBe(false)
  })

  it('should be an invalid eligibity check body, because of invalid consumption history minimum length', () => {
    const invalidBody = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [6941, 4597],
    }

    expect(validations.isValidEligibilityCheckBody(invalidBody)).toBe(false)
  })

  it('should be an invalid eligibity check body, because of invalid consumption history maximum length', () => {
    const invalidBody = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
        4200,
      ],
    }

    expect(validations.isValidEligibilityCheckBody(invalidBody)).toBe(false)
  })

  it('should be an invalid eligibity check body, because of invalid consumption history values', () => {
    const invalidBody = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, -2481, 5731, -7538, 4392, 7859, 4160, 6941,
        4597,
      ],
    }

    expect(validations.isValidEligibilityCheckBody(invalidBody)).toBe(false)
  })

  it('should be an invalid eligibity check body, because of invalid consumption history values', () => {
    const invalidBody = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, -2481, 5731, -7538, 4392, 7859, 4160, 6941,
        4597,
      ],
    }

    expect(validations.isValidEligibilityCheckBody(invalidBody)).toBe(false)
  })

  it('should be an invalid eligibity check body, because of missing document number field', () => {
    const invalidBody = {
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
      ],
    }

    expect(validations.isValidEligibilityCheckBody(invalidBody)).toBe(false)
  })

  it('should be an invalid eligibity check body, because of missing connection type field', () => {
    const invalidBody = {
      numeroDoDocumento: '14041737706',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
      ],
    }

    expect(validations.isValidEligibilityCheckBody(invalidBody)).toBe(false)
  })

  it('should be an invalid eligibity check body, because of missing consumption class field', () => {
    const invalidBody = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
      ],
    }

    expect(validations.isValidEligibilityCheckBody(invalidBody)).toBe(false)
  })

  it('should be an invalid eligibity check body, because of missing tariff modality field', () => {
    const invalidBody = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'comercial',
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
      ],
    }

    expect(validations.isValidEligibilityCheckBody(invalidBody)).toBe(false)
  })

  it('should be an invalid eligibity check body, because of missing consumption history field', () => {
    const invalidBody = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'convencional',
    }

    expect(validations.isValidEligibilityCheckBody(invalidBody)).toBe(false)
  })
})
