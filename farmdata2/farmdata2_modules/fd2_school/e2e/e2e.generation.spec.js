describe("Test the generated harvest report values", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })

    it("Testing button functionality", () => {
        cy.get("[data-cy=report-header]")
            .should("not.exist")
        cy.get("[data-cy=generate-report-button]").click()
        cy.get("[data-cy=report-header]")
            .should("be.visible")
    })
})