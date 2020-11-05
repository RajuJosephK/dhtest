// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('buyProduct', () => {
	cy.log('Buy Product')
	cy.get('a').contains('Bow Ties').click()
	cy.get('#Color').select('Blue Red')
})

Cypress.Commands.add('enterAddress', () => {
	cy.log('Enter Billing Address')
	cy.get('#snip-name').type('Raju')
	cy.get('#snip-company').type('Genius')
	cy.get('#snip-address1').type('Address1')
	cy.get('#snip-address2').type('Address2')
	cy.get('#snip-city').type('London')
	cy.get('#snip-country').select('United States')
	cy.get('#snipprovince').type('Greater London')
	cy.get('#snip-postalCode').type('0798989888')
	cy.get('#snip-email').type('test@test.com')
})

Cypress.Commands.add('verifyShippingMethods', () => {
	cy.log('Verify Shipping methods and Amounts')
	cy.get('.snip-united-states').contains('United States')
	cy.get('.snip-united-states').contains('$ 10.00')
	cy.get('.snip-canada').contains('Canada')
	cy.get('.snip-canada').contains('$ 15.00')
	cy.get('.snip-worldwide').contains('Worldwide')
	cy.get('.snip-worldwide').contains('$ 20.00')
})
