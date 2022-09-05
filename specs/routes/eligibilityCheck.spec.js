const request = require('supertest')
const { app } = require('../../src/server')

describe('Customers with eligibility', () => {
  it('should be an eligible customer', async () => {
    const eligibleInput = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
      ],
    }

    const eligibleOutput = {
      elegivel: true,
      economiaAnualDeCO2: 5553.24,
    }

    const res = await request(app)
      .post('/v1/check-eligibility')
      .send(eligibleInput)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(eligibleOutput)
  })
})

describe('Customers without eligibility', () => {
  it('should not be an eligible customer', async () => {
    const nonEligibleInput = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'rural',
      modalidadeTarifaria: 'verde',
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160,
      ],
    }

    const nonEligibleOutput = {
      elegivel: false,
      razoesInelegibilidade: [
        'Classe de consumo não aceita',
        'Modalidade tarifária não aceita',
      ],
    }

    const res = await request(app)
      .post('/v1/check-eligibility')
      .send(nonEligibleInput)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(nonEligibleOutput)
  })
})

describe('Invalid requests', () => {
  it('should not be a valid request', async () => {
    const nonEligibleInput = {
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'rural',
      modalidadeTarifaria: 'verde',
      historicoDeConsumo: [
        3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160,
      ],
    }

    const res = await request(app)
      .post('/v1/check-eligibility')
      .send(nonEligibleInput)

    expect(res.statusCode).toEqual(400)
    expect(res.body).toEqual('Invalid request. Check the fields!')
  })
})
