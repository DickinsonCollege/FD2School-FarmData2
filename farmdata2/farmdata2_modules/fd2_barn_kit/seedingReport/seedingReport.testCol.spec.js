describe("Testing Transplanting Report Default Values", () => {
    beforeEach(() => {
        cy.login('manager1', 'farmdata2')
        cy.visit('/farm/fd2-barn-kit/seedingReport')

        // Wait here for the maps to load in the page.
        cy.waitForPage()

        cy.get('[data-cy=start-date-select]')
            .type('2020-01-01')

        cy.get('[data-cy="generate-rpt-btn"]').click()
    })

    // Adacus section
    it("Check if the columns values are correct when All is selected", () => {
        const expectedColumns = [
            'Date',
            'Crop',
            'Area',
            'Seeding',
            'Workers',
            'Hours',
            'Varieties',
            'Comments',
            'User',
            'Edit'
        ]
        //Check if columns are visible.
        expectedColumns.forEach(column => {
            cy.get('[data-cy="table-headers"]').contains(column).should('be.visible')
        })

        const hiddenColumns = [
            'Row Feet',
            'Bed Feet',
            'Rows/Bed',
            'Seeds',
            'Trays',
            'Cells/Tray'
        ]
        //Check if hidden columns DNE.
        hiddenColumns.forEach(column => {
            cy.get('[data-cy="table-headers"]').contains(column).should('not.exist')
        })

    })
    
    // Brian section
    it("Check if the columns values are correct when Direct Seedings is selected", () => {
        //Select "Direct Seedings" from the seeding type dropdown
        cy.get('[data-cy="seeding-type-dropdown"] > [data-cy="dropdown-input"]')
            .select("Direct Seedings")
        
        // Verify the visible columns
        const expectedColumns = [
            'Date',
            'Crop',
            'Area',
            'Seeding',
            'Row Feet',
            'Bed Feet',
            'Rows/Bed',
            'Workers',
            'Hours',
            'Varieties',
            'Comments',
            'User',
            'Edit'
        ]

        // Check each expected column exists in the table header
        expectedColumns.forEach(column => {
            cy.get('[data-cy="table-headers"]').contains(column).should('be.visible')
        })

        // Verify columns that should NOT be visible for Direct Seedings
        const hiddenColumns = [
            'Seeds',
            'Trays',
            'Cells/Tray'
        ]

        hiddenColumns.forEach(column => {
            cy.get('[data-cy="table-headers"]').contains(column).should('not.exist')
        })
        
    })

    // Aziz section
    it("Check if the columns values are correct when Tray Seeding is selected", () => {
        cy.get('[data-cy="seeding-type-dropdown"] > [data-cy="dropdown-input"]')
            .select("Tray Seedings")

        const expectedColumns = [
            'Date',
            'Crop',
            'Area',
            'Seeding',
            'Seeds',
            'Trays',
            'Cells/Tray',
            'Workers',
            'Hours',
            'Varieties',
            'Comments',
            'User',
            'Edit'
        ]

        //Check each expected column exists in the table header
        expectedColumns.forEach(column => {
            cy.get('[data-cy="table-headers"]').contains(column).should('be.visible')
        })
        
        const hiddenColumns = [
            'Row Feet',
            'Bed Feet',
            'Rows/Bed'
        ]

        // Verify columns that should NOT be visible
        hiddenColumns.forEach(column => {
            cy.get('[data-cy="table-headers"]').contains(column).should('not.exist')
        })
    })

})