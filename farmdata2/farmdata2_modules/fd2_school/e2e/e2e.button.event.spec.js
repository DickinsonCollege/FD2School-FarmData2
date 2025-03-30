describe("Test the generate report button click event", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })

    it("Check that the report title does not exist before clicking the button", () => {
        // cy.get("[data-cy=report-title]").should("not.exist")
    })
      
    it("Check the page header", () => {
        cy.get("[data-cy=generate-report-button]").click()
    })

    it("Check that the report title is visible after clicking the button", () => {
        cy.get("[data-cy=report-title]").should("be.visible")
    })

    it("Check report details after clicking the button", () => {
        cy.get("[data-cy=generate-report-button]").click()
        cy.get("[data-cy=farm]").should("have.text","Farm:Sample Farm")
        cy.get("[data-cy=user]").should("contain.text","manager1")
        cy.get("[data-cy=language]").should("have.text","Language:English")
  
    })

})