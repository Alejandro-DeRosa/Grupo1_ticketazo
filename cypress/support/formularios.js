Cypress.Commands.add('llenarFormulario', (data) => {
  cy.get('input[aria-label="Nombre"]').eq(0).clear().type(data.nombre)
  cy.get('input[aria-label="Nombre de usuario"]').clear().type(data.usuario)
  cy.get('input[aria-label="Teléfono"]').clear().type(data.telefono)
  cy.get('input[aria-label="LinkedIn"]').clear().type(data.linkedin)
  cy.get('input[aria-label="Twitter"]').clear().type(data.twitter)
  cy.get('input[aria-label="Instagram"]').clear().type(data.instagram)
  cy.get('input[aria-label="TikTok"]').clear().type(data.tiktok)
})

Cypress.Commands.add('login', () => {
  cy.get('[data-cy="input-email"]').type('admin@admin.com')
  cy.get('[data-cy="input-password"]').type('admin')
  cy.get('[data-cy="btn-login"]').click()
})

import 'cypress-file-upload'