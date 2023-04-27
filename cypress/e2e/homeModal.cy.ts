describe('Open modal', () => {
  it('should visit', () => {
    cy.visit('/');

    cy.get('img').should('have.length', 12);
    cy.get('img').first().click();
    cy.get('button').should('contain.text', '✖');
    cy.get('button').last().click();
    cy.get('button').should('not.contain.text', '✖');
  });
});
