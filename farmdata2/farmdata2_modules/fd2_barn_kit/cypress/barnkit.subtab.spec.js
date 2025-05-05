describe("Test for BarnKit Sub-Tabs", () => {
    beforeEach(() => {
        cy.login('manager1', 'farmdata2')
        cy.visit('/farm/fd2-barn-kit')

    });

    // Adacus Section
    it("The BarnKit tab contains sub-tabs", () => {
        cy.get('ul.tabs--secondary.pagination li a').contains('Info').should('be.visible')
        cy.get('ul.tabs--secondary.pagination li a').contains('Seeding Report').should('be.visible')
        cy.get('ul.tabs--secondary.pagination li a').contains('Transplanting Report').should('be.visible')
    }) 

    // Brian Section
    it("The order of the tabs are correct", () => {
        const expectedTabs = ['Info', 'Seeding Report', 'Transplanting Report'];

        cy.get('ul.tabs--secondary.pagination li a')
          .should('have.length', expectedTabs.length)
          .each((el, index) => {
            cy.wrap(el).should('contain.text', expectedTabs[index]);
        });
    })

    // Aziz Section
    it("The number of sub-tabs are correct", () => {
        const expectedTabs = ['Info', 'Seeding Report', 'Transplanting Report'];
        
        cy.get('ul.tabs--secondary.pagination li a')
        .should('have.length', expectedTabs.length);
    })
})