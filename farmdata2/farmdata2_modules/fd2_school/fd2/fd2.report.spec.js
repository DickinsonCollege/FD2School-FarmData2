describe("Test the report generation", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })

    it("Check the report title exists", () => {
      cy.get("[data-cy=report-title]").should("exist")
    })


    it("Click the generate report button", () => {
      cy.get("[data-cy=generate-report-button]").click()
    })

    it("Check the report title is visible", () => {
      cy.get("[data-cy=report-title]").should("be.visible")
    })

    it("Click the farm info", () => {
      cy.get("[data-cy=generate-report-button]").click()
      cy.get("[data-cy=farm-name]").should("have.text","Farm: Sample Farm")
      cy.get("[data-cy=user-name]").should("contain.text","manager1")
      cy.get("[data-cy=user-lang]").should("have.text","English")

    })


})
