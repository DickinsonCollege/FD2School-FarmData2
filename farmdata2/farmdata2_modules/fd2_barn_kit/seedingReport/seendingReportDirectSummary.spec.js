describe('Test the Seeding Report Default View', () => {
    beforeEach(() => {
      cy.login("manager1", "farmdata2")
      cy.visit("/farm/fd2-barn-kit/seedingReport");
      cy.waitForPage();
    });
   
    it('should correctly compute the Direct Seeding Summary fields', () => {
      // Set the start and end date to include known direct seeding logs
      cy.get('[data-cy="date-range-selection"] input').eq(0).clear().type('2020-01-01');
      cy.get('[data-cy="date-range-selection"] input').eq(1).clear().type('2021-04-10');
      cy.get('[data-cy="generate-rpt-btn"]').click();
   
   
      // Wait for data to load
      //cy.get('[data-cy="loader"]').should('not.exist');
   
   
      cy.get('[data-cy="report-table"]').should('exist');
   
   
      // Filter to Direct Seedings only to avoid Tray data
      //cy.get('[data-cy="seeding-type-dropdown"]').contains('Direct Seedings').click();
   
      // Wait for table to reload and extract table values
      let expectedRowFeet =35530;   // ← calculated from known data
      let expectedBedFeet = 18440;   // ← sum of (Row Feet / Rows/Bed) for each log
      let expectedHours = 2.04;     // ← sum of (Workers * Hours) per log
      let expectedRowFeetPerHour = (expectedRowFeet / expectedHours).toFixed(2);
      let expectedBedFeetPerHour = (expectedBedFeet / expectedHours).toFixed(2);
   
      // Total Row Feet Planted
      cy.get('[data-cy="direct-total-rowft"]').should('have.text', expectedRowFeet.toString());
   
      // Total Bed Feet Planted
      cy.get('[data-cy="direct-total-bedft"]').should('have.text', expectedBedFeet.toString());
   
      // Total Hours
      cy.get('[data-cy="direct-total-hours"]').should('have.text', expectedHours.toString());
   
      // Avg Row Feet/Hour
      cy.get('[data-cy="direct-total-rowft-hour"]').should('have.text', expectedRowFeetPerHour);
   
      // Avg Bed Feet/Hour
      cy.get('[data-cy="direct-total-bedfr-hour"]').should('have.text', expectedBedFeetPerHour);
    });
   
  });