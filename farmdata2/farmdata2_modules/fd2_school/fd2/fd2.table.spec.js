describe("Test the harvest report default values", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/fd2")
    })
      
    it("Check the page header", () => {
        cy.get("[data-cy=page-header]")
            .should("have.text","Harvest Report")

    })

    it("Check table headers after generating the report", () => {
        // Click on the "Generate Report" button to display the table
        cy.get("[data-cy=generate-report-button]").click()

        // Check if all table headers are correct
        cy.get("[data-cy=h0]").should("have.text", "Row")
        cy.get("[data-cy=h1]").should("have.text", "Date")
        cy.get("[data-cy=h2]").should("have.text", "Area")
        cy.get("[data-cy=h3]").should("have.text", "Crop")
        cy.get("[data-cy=h4]").should("have.text", "Yield")
        cy.get("[data-cy=h5]").should("have.text", "Units")

        cy.get("[data-cy=table-headers]")
            .children("th")
            .should("have.length", 6) // Check that there are 6 columns
    })
})
