describe("Test the report generation", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/fd2")
    })

    it("Check the report title exists", () => {
      cy.get("[data-cy=report-title]").should("exist")
    })




})

