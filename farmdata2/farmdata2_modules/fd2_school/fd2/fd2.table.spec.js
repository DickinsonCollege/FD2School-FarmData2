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

    it("Test filtering by crop", () => {
        // Select a crop from the dropdown
        // Using the > operator to access the dropdown input and select a crop (e.g., "ARUGULA")
        cy.get("[data-cy=crop-dropdown]").click() // Click to open the dropdown
    
        // Force the click if the element is being covered by another element
        cy.contains("ARUGULA").click({ force: true }) // Force clicking if it's covered
    
        // Generate the report using the default date range
        cy.get("[data-cy=generate-report-button]").click()
    
        // Check that the table is filtered and the correct number of rows are displayed
        cy.get("[data-cy=table-body]")
            .children("tr") // Get all rows in the table body
            .should("have.length", 4) // Adjust the number based on how many "ARUGULA" rows you expect

        cy.get("[data-cy=table-body]")
        .children("tr") // Get all rows in the table body
        .each(($row) => {
            cy.wrap($row)
                .children("td") // Get all columns in the current row
                .eq(3) // Get the 4th column (index 3)
                .should("contain.text", "ARUGULA") // Check if the text in the 4th column is "ARUGULA"
        })
    
    })
    
})
