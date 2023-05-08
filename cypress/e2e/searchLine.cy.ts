describe('Check search line', () => {
  it('should change cards on home page', () => {
    cy.visit('/');
    cy.get('img').should('have.length', 12);

    cy.get('#search-bar').should('contain.text', '');

    cy.get('#search-bar').type('asian');
    cy.get('button').first().click();
    cy.get('img').should('have.length', 2);
  });
});
