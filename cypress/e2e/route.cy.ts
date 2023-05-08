describe('Check nav links', () => {
  it('should open home page', () => {
    cy.visit('/about');
    cy.get("a[href='/']").click();
    cy.get('h1').should('have.text', 'Home Page');
  });

  it('should change for about page', () => {
    cy.visit('/');
    cy.get("a[href='/about']").click();
    cy.get('h1').should('have.text', 'About Page');
  });

  it('should change for form page', () => {
    cy.visit('/');
    cy.get("a[href='/form']").click();
    cy.get('h1').should('have.text', 'Form Page');
  });
});
