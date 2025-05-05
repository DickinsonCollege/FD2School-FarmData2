describe('Test the harvest report "Generate Report" button', () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })
      
    it("Check the Generate Report button", () => {
        cy.get("[data-cy=report-title").should("not.exist")
        cy.get("[data-cy=generate-report-button]").click()
        cy.get("[data-cy=report-title").should("be.visible")
    })
})
