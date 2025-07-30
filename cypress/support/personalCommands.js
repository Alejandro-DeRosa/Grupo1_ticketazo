Cypress.Commands.add('verificarAlert', (mensajeEsperado) => {
  cy.window().then((win) => {
    cy.stub(win, 'alert').as('alerta');
  });
  cy.get('@alerta').should('have.been.calledWith', mensajeEsperado);
});

Cypress.Commands.add('inicioSesion', (user, pass) =>{
  cy.visit('https://vps-3696213-x.dattaweb.com/auth/login');
  cy.get('[data-cy="input-email"]').type(user);
  cy.get('[data-cy="input-password"]').type(pass);
  cy.get('[data-cy="btn-login"]').click();
});