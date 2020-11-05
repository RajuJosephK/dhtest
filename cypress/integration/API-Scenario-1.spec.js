// This aim of this spec is to make api calls to get the latest FX rates for differnt scenarios

describe('Latest API Test', () => {


	//Api call with symbols
	it('Symbols', () => {
		cy.request('https://api.ratesapi.io/api/latest?symbols=USD,GBP').as('reqSymbols')

		cy.get('@reqSymbols').then((response) => {
			expect(response).to.have.property('status', 200)
			expect(response.body).to.not.be.null
			expect(response.body).to.have.property('base', 'EUR')
			expect(response.body.rates).to.not.be.null
		})
	})


	// Api call with base
	it('Base', () => {
		cy.request('https://api.ratesapi.io/api/latest?base=USD').as('reqBase')

		cy.get('@reqBase').then((response) => {
			expect(response).to.have.property('status', 200)
			expect(response.body).to.not.be.null
			expect(response.body).to.have.property('base', 'USD')
			expect(response.body.rates).to.not.be.null
		})
	})

   // Api call with symbols and base
	it('Symbols and Base', () => {
		cy.request('https://api.ratesapi.io/api/latest?base=USD&symbols=GBP ').as(
			'reqBaseSymb'
		)

		cy.get('@reqBaseSymb').then((response) => {
			expect(response).to.have.property('status', 200)
			expect(response.body).to.not.be.null
			expect(response.body).to.have.property('base', 'USD')
			expect(response.body.rates).to.not.be.null
		})
	})
})
