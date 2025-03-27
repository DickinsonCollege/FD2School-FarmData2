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

    it("Testing correctness of information", () => {
        cy.get("[data-cy=generate-report-button]").click()
        cy.get("[data-cy=farm-name]")
            .should("have.text", "Farm:Sample Farm")
        cy.get("[data-cy=username]")
            .should("contain.text", "manager1")
        cy.get("[data-cy=language]")
            .should("have.text", "English")
    })
})