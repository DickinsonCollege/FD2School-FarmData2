describe("Test the harvest report with interaction", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })
      
    it("Clicks Generate Report Button", () => {
        cy.get("[data-cy=generate-report-button]").click()
    })

    it("Checks the farm name, user, and language", () => {
        cy.get("[data-cy=generate-report-button]").click()
        cy.get("[data-cy=farm-name]").should("have.text", "Farm: Sample Farm")
        cy.get("[data-cy=user-name]").should("contain.text", "manager1")
        cy.get("[data-cy=language]").should("have.text", "English")
    })
})