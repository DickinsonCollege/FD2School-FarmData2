describe("Test the harvest report default values", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })
      
    it("Check the generate button", () => {
        cy.get('[data-cy="report-header"]').should('not.exist');
        cy.get("[data-cy=generate-report-button]").click();
        cy.get('[data-cy="report-header"]').should('be.visible');
    })

    it('Checks that the farm name is correctly displayed when the report is generated', () => {
        // Click the "Generate Report" button
        cy.get('[data-cy="generate-report-button"]').click();
    
        // Check that the farm name is displayed correctly
        cy.get('[data-cy="farm-name"]').should('be.visible').and('contain.text', 'Sample Farm');
    });
    
    it('Checks that the language is correctly displayed when the report is generated', () => {
        // Click the "Generate Report" button
        cy.get('[data-cy="generate-report-button"]').click();
    
        // Check that the language is displayed correctly
        cy.get('[data-cy="language"]').should('have.text', 'English');
    });
    
    
})
