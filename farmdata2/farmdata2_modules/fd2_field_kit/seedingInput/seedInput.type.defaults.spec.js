describe("Test default seeding input values", () => {
	beforeEach(() => {
		cy.login("manager1", "farmdata2")
		cy.visit("/farm/fd2-field-kit/seedingInput")
	})

// Remember, try to only edit lines inside the it() you are working on!

	it("Check that element for Tray is enabled", () => {
                cy.get("[data-cy=tray-seedings-box]").should("not.be.disabled")  
	})



        it("Check that element for Direct is enabled", () => {
                cy.get("[data-cy=direct-seedings-box]").should("not.be.disabled")
        })



        it("Check that neither Tray nor Element is selected", () => {
		cy.get("[data-cy=tray-seedings]").should('not.be.checked')
                cy.get("[data-cy=direct-seedings]").should('not.be.checked')

        })



        it("Check that message is visible indicating that Tray or Direct must be selected", () => {
		cy.get("[data-cy=seeding-select-message]").should('be.visible')
        })



        it("Check that form elements for either the Tray and Direct seedings are not visible or do not exist", () => {
                cy.get("[data-cy=tray-seedings-box]").should('not.be.visible')
                cy.get("[data-cy=direct-seedings-box]").should('not.be.visible')
        })




})
