describe("Harvest Report Table Headers", () => {
    beforeEach(() => {
      cy.login("manager1", "farmdata2"); 
      cy.visit("/farm/fd2-school/fd2");
    });
  
    it("should display correct table headers after generating report", () => {
      cy.get('[data-cy=generate-report-button]').click();
  
      cy.get('[data-cy=h0]').should('have.text', 'Date');
      cy.get('[data-cy=h1]').should('have.text', 'Area');
      cy.get('[data-cy=h2]').should('have.text', 'Crop');
      cy.get('[data-cy=h3]').should('have.text', 'Yield');
      cy.get('[data-cy=h4]').should('have.text', 'Units');

      cy.get('[data-cy=table-headers]')
      .children()
      .should('have.length', 5); 
    });
      
    it("filters the table by selected crop", () => {
        cy.get('[data-cy=crop-select] > [data-cy=dropdown-input]').select('BEAN');
        cy.get('[data-cy=generate-report-button]').click();
    
        cy.get('[data-cy=harvest-report-table]').should('exist');
        
    });   

});