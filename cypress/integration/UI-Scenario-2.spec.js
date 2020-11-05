// This spec is to test UI Scenario - 2
// I have imported the commonad module into this spec.
//Ideally we do not have to do this. Looks like there is some issue with my local environment
// In the test I have used some custom commands which can be extenended / refined in future

import '../support/commands'

// Test for UI scenario 2
describe('UI Scenario 2', () => {
	it('Test to verify buy product workflow', () => {
		//Visit the web app
		cy.log('Visiting the application page')
		cy.visit('/')

		// select the product to buy -- Calling command buyProduct() which can be extend by passing parmeters
		cy.buyProduct()
		cy.wait(1000)
		cy.get('#buyButton').click()

		//Verifying the color and unit price
		cy.log('Verify color, unit price')
		//cy.wait(10000)
		cy.get('#snipcart_custom_Color').then(($el) => {
			expect($el).to.have.value('Blue Red')
		})

		cy.get('[data-bind=unitPrice]').should('contain', '7.00')
		//cy.wait(1000)

		//Add Quantity
		cy.log('Add quntity and verify the price')
		cy.get('.snip-quantity-trigger__btn--add').click()
		//cy.wait(1000)

		//Verify total price
		cy.get('[data-bind=totalPrice]').contains('$ 14')
		//cy.wait(1000)

		//Verify the color of X button
		cy.get('.snip-product__remove').then(($el) =>
			expect($el).to.have.css('color', 'rgb(255, 17, 0)')
		)

		//Verify sub total amount and click next
		cy.get('#snipcart-amount').contains('$ 14.00')
		cy.get('.js-next').click()

		// Guest Checkout

		// Verif the color of the checkout button and relative url and click checkout button
		cy.log('Verif the color of the checkout button and relative url ')
		cy.get('#snipcart-guest-checkout').then(($el) =>
			expect($el).to.have.css('color', 'rgb(34, 34, 34)')
		)
		cy.url().should('include', '/login')
		cy.get('#snipcart-guest-checkout').click()

		//Enter the billing address and click next -- uses command enter address whcin can be parameterised in future
		cy.enterAddress()
		cy.get('#snipcart-next').click()

		// Verify shipping methods and click next -- uses command enter address whcin can be parameterised in future
		cy.verifyShippingMethods()
		cy.get('#snipcart-next').click()

		// Verify the payment details and click next
		cy.log('Verify payment information')
		cy.get('#snip-type').should('contain', 'Visa')
		cy.get('#snip-ownerName').then(($el) => {
			expect($el).to.have.value('Raju')
		})
		cy.get('#snip-number').then(($el) => {
			expect($el).to.have.value('4242424242424242')
		})
		cy.get('#snip-cvc').then(($el) => {
			expect($el).to.have.value('345')
		})
		cy.get('#snip-expirationMonth').should('contain', 'January')
		cy.get('#snip-expirationYear').should('contain', '2022')
		cy.get('#snipcart-paymentmethod-pay').click()

		// Confirm order page
		//Verify Address
		cy.log('Verify address details')
		cy.get('.snipcart-step').contains('Raju')
		cy.get('.snipcart-step').contains('Genius')
		cy.get('.snipcart-step').contains('Address1')
		cy.get('.snipcart-step').contains('Address2')
		cy.get('.snipcart-step').contains('Address2')
		cy.get('.snipcart-step').contains('London, AL, US')
		cy.get('.snipcart-step').contains('0798989888')

		//Verify Payment Information
		cy.log('Verify payment details')
		cy.get('.snipcart-step').contains('Payment method : Credit card')
		cy.get('.snipcart-step').contains('Name on card : Raju')
		cy.get('.snipcart-step').contains('Card type : Visa')
		cy.get('.snipcart-step').contains('Card number : 4242')

		//Verify Product Description
		cy.log('Verify product description')
		cy.get('.snip-product__description').contains(
			'The bow-tie (not to be confused with the tae bo) is an aphrodisiac worn by male humans attempting to win one or more mates.'
		)

		//Verify product price, shipping and total amoutns and click to place order
		cy.log('Verify price details on order page')
		cy.get('#snipcart-fees').contains('$ 14.00')
		cy.get('#snipcart-fees').contains('$ 10.00')
		cy.get('#snipcart-total').contains('$ 24.00')
		cy.get('.js-submit').click()

		//Verify the notifcation banner that order is place
		cy.log('Verify confirm order notification')
		cy.get('.snip-flash__item').contains(
			'Thank you for your order! Your invoice has been sent to you by email, you should receive it soon.'
		)

		//Verify order
		cy.log('Verify order number')
		cy.get('#snipcart-title').contains('SNIP')
	})
})
