// This aim of this spec to test api calls to get FX rates for specific date in the past.
// This test covers differnt scenarios

describe('Latest API Test', () => {
	//Api call with symbols
	it('Symbols', () => {
		cy.request('https://api.ratesapi.io/api/2010-01-12?symbols=USD,GBP').as('reqSymbols')

		cy.get('@reqSymbols').then((response) => {
			expect(response).to.have.property('status', 200)
			expect(response.body).to.have.property('base', 'EUR')

			// The below assertions were writtend with the view that the rate will remain the same
			cy.log('The assertion assumes that the past fx rates will not cahnge')
			expect(response.body.rates).to.have.property('USD', 1.4481)
			expect(response.body.rates).to.have.property('GBP', 0.8972)
		})
	})

	// Api call with base
	it('Base', () => {
		cy.request('https://api.ratesapi.io/api/2010-02-12?base=USD').as('reqBase')

		cy.get('@reqBase').then((response) => {
			expect(response).to.have.property('status', 200)
			expect(response.body).to.have.property('base', 'USD')
			expect(response.body.rates).to.not.be.null
			// The below assertion were writtend with the view that the rate will remain the same
			cy.log('The assertion assumes that the past fx rates will not cahnge')
			expect(response.body.rates).to.have.property('GBP', 0.6403625111)
		})
	})

	// Api call with symbols and base
	it('Symbols and Base', () => {
		cy.request('https://api.ratesapi.io/api/2010-03-12?base=USD&symbols=GBP').as('reqBaseSymb')

		cy.get('@reqBaseSymb').then((response) => {
			expect(response).to.have.property('status', 200)
			expect(response.body).to.have.property('base', 'USD')
			// The assertions were writtend with the view that the rate will remain the same
			cy.log('The assertion assumes that the past fx rates will not cahnge')
			expect(response.body.rates).to.have.property('GBP', 0.6598619688)
		})
	})
})
