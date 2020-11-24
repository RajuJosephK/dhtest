// This spec is to test the UI Scenario 1

describe('UI Scenario 1', () => {
	before(function() {
		// run this once before all code
		return window.caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					return window.caches.delete(cacheName);
				})
			);
		});
	});

	// UI Test Scenario 1
	it('Verify Product details', () => {
		// Vist the site using the  base url from the cypress.json

		cy.log('Visiting the application web page');
		cy.visit('/');

		// Select the product
		cy.log('Selecting the product Fireworks');
		cy.get('a').contains('Fireworks').click();

		// Verify the product options
		cy.log('Verifying the product options');
		cy.get('#Sounds').select('Huge BOOM').should('have.value', 'Huge BOOM');
		cy.get('#Sounds').select('Sparks').should('have.value', 'Sparks');
		cy.get('#Sounds').select('That long strident sound').should('have.value', 'That long strident sound');

		//Verify the color of the buy button
		cy.log('Verify the color of the buy button');
		cy
			.get('#buyButton')
			.should(
				'have.attr',
				'style',
				'background-color: rgb(33, 33, 33); border-radius: 5px; color: rgb(245, 245, 245); font-weight: bold; padding: 15px 35px;'
			);

		//verify the relative URL
		cy.log('verify the relative URL');
		cy.url().should('include', '/fireworks/');
	});
});
