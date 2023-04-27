describe('Check http://localhost:5173 request', () => {
  it('Get 200 status, home page', () => {
    cy.request({
      method: 'GET',
      url: `/`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property('headers');
      expect(response.body).to.have.contains('Home Page');
    });
  });

  it('Get 200 status, about page', () => {
    cy.request({
      method: 'GET',
      url: `/about`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property('headers');
      expect(response.body).to.have.contains('About Page');
    });
  });

  it('Get 200 status, form page', () => {
    cy.request({
      method: 'GET',
      url: `/form`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property('headers');
      expect(response.body).to.have.contains('Form Page');
    });
  });

  it('Get 200 status, Not Found page', () => {
    cy.request({
      method: 'GET',
      url: `/notfound`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property('headers');
      expect(response.body).to.have.contains('Not Found Page');
    });
  });
});
