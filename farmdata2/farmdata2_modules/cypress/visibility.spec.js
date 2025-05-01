describe('Check visibility of FarmData2 tabs based on user role', () => {
    it('Login as manager1, should see FieldKit, BarnKit, and FD2 Config tabs', () => {
      cy.login('manager1', 'farmdata2')
      cy.visit('/farm')
      cy.get('.nav-tabs').contains('FieldKit').should('exist')
      cy.get('.nav-tabs').contains('BarnKit').should('exist')
      cy.get('.nav-tabs').contains('FD2 Config').should('exist')
    })
  
    it('Login as worker1, should see FieldKit and BarnKit tabs but not FD2 Config', () => {
      cy.login('worker1', 'farmdata2')
      cy.visit('/farm')
      cy.get('.nav-tabs').contains('FieldKit').should('exist')
      cy.get('.nav-tabs').contains('BarnKit').should('exist')
      cy.get('.nav-tabs').contains('FD2 Config').should('not.exist')
    })
  
    it('Login as guest, should not see FieldKit, BarnKit, or FD2 Config tabs', () => {
      cy.login('guest', 'farmdata2')
      cy.visit('/farm')
      cy.get('.nav-tabs').contains('FieldKit').should('not.exist')
      cy.get('.nav-tabs').contains('BarnKit').should('not.exist')
      cy.get('.nav-tabs').contains('FD2 Config').should('not.exist')
    })
  })