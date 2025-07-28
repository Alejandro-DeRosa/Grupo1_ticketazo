describe('Edición de perfil en Ticketazo', () => {
  beforeEach(() => {
    cy.visit('/editProfile')
    cy.login()
  })

  it('CP-EDP-001 - Rellena campos y guarda los cambios exitosamente', () => {
    cy.intercept('PUT', '**/api/backend/auth/actualizarCliente').as('actualizarPerfil')

    cy.fixture('profile').then((data) => {
      cy.llenarFormulario(data)
    })

    cy.get('[data-cy="btn-save-profile"]').click()

    cy.get('[aria-label="toast"][role="alertdialog"]', { timeout: 5000 })
      .should('be.visible')
      .and('contain', '¡Perfil actualizado con éxito!')

    cy.wait('@actualizarPerfil').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      expect(interception.response.body).to.eq('Usuario actualizado con éxito')
    })
  })

  it('CP-EDP-002 - Carga una imagen de perfil correctamente', () => {
    cy.intercept('PUT', '**/api/backend/auth/saveProfileImage').as('subidaImagen')

    cy.get('input[type="file"]').attachFile('perfil.jpeg')

    cy.get('[aria-label="toast"][role="alertdialog"]', { timeout: 5000 })
      .should('be.visible')
      .and('contain', 'La imagen de perfil fue actualizada')

    cy.wait('@subidaImagen').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })
  })
})