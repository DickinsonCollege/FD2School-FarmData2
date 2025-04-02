describe("Test the harvest report default values", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/fd2")
    })
      
    it("Check the page header", () => {
        cy.get("[data-cy=page-header]")
            .should("have.text","Harvest Report")

    })

    it("Check the default start and end date", () => {
        cy.get('[data-cy="start-date"]').should('have.value', '2020-05-05');
        cy.get('[data-cy="end-date"]').should('have.value', '2020-05-15');        

    })

    it("Check the crop names", () => {
        // Check 1st option in crop dropdown
        cy.get("[data-cy=crop-dropdown] > [data-cy=dropdown-input] > [data-cy=option1]")
            .should('have.text', 'ARUGULA');
        
        // Check 2nd option in crop dropdown (index 1)
        cy.get("[data-cy=crop-dropdown] > [data-cy=dropdown-input] > [data-cy=option2]")
            .should('have.text', 'ASPARAGUS');
        
        // Check 5th option in crop dropdown (index 4)
        cy.get("[data-cy=crop-dropdown] > [data-cy=dropdown-input] > [data-cy=option5]")
            .should('have.text', 'BEAN-FAVA');

        // Check last option in crop dropdown
        cy.get("[data-cy=crop-dropdown] > [data-cy=dropdown-input] > [data-cy=option111]")
            .should('have.text', 'ZUCCHINI');
        
        // Check the number of options in the crop dropdown
        cy.get("[data-cy=crop-dropdown] > [data-cy=dropdown-input]").children()
            .should('have.length', 112);
    })

    
})
