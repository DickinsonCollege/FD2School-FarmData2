describe('Generate Harvest Report', () => {
    beforeEach(() => {
      cy.login("manager1", "farmdata2")
      cy.visit("/farm/fd2-school/fd2.html")
    })
  
    it('passes', () => {
      cy.get('[data-cy=report-header]').should('not.exist');
      cy.get("[data-cy=generate-report-button]").click()
      cy.get('[data-cy=report-header]').should('be.visible');
      cy.get('[data-cy=farm-name]').should('have.text', 'Farm: Sample Farm')
      cy.get('[data-cy=user-name]')
      .should('contain.text', 'User:');
      cy.get('[data-cy=language]',)
      .should('have.text', 'en');
    })
  })