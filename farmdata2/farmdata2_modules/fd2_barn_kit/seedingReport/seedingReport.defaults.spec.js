/**
 * Tests the default state of the Seeding Report page in the BarnKit module.
 * Ensures correct UI elements appear and that default dates are properly set.
 */
import dayjs from 'dayjs'

describe('Test the Seeding Report Default View', () => {
  beforeEach(() => {
    cy.login("manager1", "farmdata2")
    cy.visit("/farm/fd2-barn-kit/seedingReport");
  });

  it('displays correct defaults', () => {
    cy.contains('h1', "Seeding Report");
    cy.contains('legend', "Set Dates");
    cy.get('button').contains("Generate Report").should('be.enabled');


  // Check default start and end dates
  const expectedStart = dayjs().startOf('year').format('YYYY-MM-DD').toString()
  const expectedEnd = dayjs().format('YYYY-MM-DD').toString()

  cy.get('[data-cy="date-range-selection"]').within(() => {
    cy.get('input[type="date"]').eq(0).should('have.value', expectedStart)  //Test Start Date
    cy.get('input[type="date"]').eq(1).should('have.value', expectedEnd)   //Test End Date

  });



  // Report should NOT be visible by default
  cy.get('[data-cy="filters-panel"]').should('not.exist');
  cy.get('[data-cy="report-table"]').should('not.exist');
  cy.get('[data-cy="no-logs-message"]').should('not.exist');
  cy.get('[data-cy="loader"]').should('not.exist');
});


});