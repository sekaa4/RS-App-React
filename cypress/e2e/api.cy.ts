describe('Check http://localhost:5173 request', () => {
  it('Get 200 status', () => {
    cy.request({
      method: 'GET',
      url: `http://localhost:5173`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property('headers');
    });
  });
});
