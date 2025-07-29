describe('Edición de perfil en Ticketazo', () => {
  beforeEach(() => {
    cy.visit('/editProfile')
    cy.login()
  })

it('CP-EDP-001 - sin nombre', () => {
  cy.fixture('profile').then((data) => {
    cy.get('input[aria-label="Nombre"]').eq(0).clear()
    cy.get('input[aria-label="Nombre de usuario"]').clear().type(data.usuario)
    cy.get('input[aria-label="Teléfono"]').clear().type(data.telefono)
    cy.get('input[aria-label="LinkedIn"]').clear().type(data.linkedin)
    cy.get('input[aria-label="Twitter"]').clear().type(data.twitter)
    cy.get('input[aria-label="Instagram"]').clear().type(data.instagram)
    cy.get('input[aria-label="TikTok"]').clear().type(data.tiktok)
  })

  cy.get('[data-cy="btn-save-profile"]').click()
  cy.get('[aria-label="toast"][role="alertdialog"]', { timeout: 2000 })
    .should('be.visible')
    .and('contain', 'Hubo un problema al actualizar el perfil.')
})

it('CP-EDP-002 - sin nombre de usuario', () => {
  cy.fixture('profile').then((data) => {
    cy.get('input[aria-label="Nombre"]').eq(0).clear().type(data.nombre)
    cy.get('input[aria-label="Nombre de usuario"]').clear()
    cy.get('input[aria-label="Teléfono"]').clear().type(data.telefono)
    cy.get('input[aria-label="LinkedIn"]').clear().type(data.linkedin)
    cy.get('input[aria-label="Twitter"]').clear().type(data.twitter)
    cy.get('input[aria-label="Instagram"]').clear().type(data.instagram)
    cy.get('input[aria-label="TikTok"]').clear().type(data.tiktok)
  })

  cy.get('[data-cy="btn-save-profile"]').click()
  cy.get('[aria-label="toast"][role="alertdialog"]', { timeout: 2000 })
    .should('be.visible')
    .and('contain', 'Hubo un problema al actualizar el perfil.')
})

it('CP-EDP-003 - sin teléfono', () => {
  cy.fixture('profile').then((data) => {
    cy.get('input[aria-label="Nombre"]').eq(0).clear().type(data.nombre)
    cy.get('input[aria-label="Nombre de usuario"]').clear().type(data.usuario)
    cy.get('input[aria-label="Teléfono"]').clear()
    cy.get('input[aria-label="LinkedIn"]').clear().type(data.linkedin)
    cy.get('input[aria-label="Twitter"]').clear().type(data.twitter)
    cy.get('input[aria-label="Instagram"]').clear().type(data.instagram)
    cy.get('input[aria-label="TikTok"]').clear().type(data.tiktok)
  })

  cy.get('[data-cy="btn-save-profile"]').click()
  cy.get('[aria-label="toast"][role="alertdialog"]', { timeout: 2000 })
    .should('be.visible')
    .and('contain', 'Hubo un problema al actualizar el perfil.')
})

it('CP-EDP-004 - sin LinkedIn', () => {
  cy.fixture('profile').then((data) => {
    cy.get('input[aria-label="Nombre"]').eq(0).clear().type(data.nombre)
    cy.get('input[aria-label="Nombre de usuario"]').clear().type(data.usuario)
    cy.get('input[aria-label="Teléfono"]').clear().type(data.telefono)
    cy.get('input[aria-label="LinkedIn"]').clear()
    cy.get('input[aria-label="Twitter"]').clear().type(data.twitter)
    cy.get('input[aria-label="Instagram"]').clear().type(data.instagram)
    cy.get('input[aria-label="TikTok"]').clear().type(data.tiktok)
  })

  cy.get('[data-cy="btn-save-profile"]').click()
  cy.get('[aria-label="toast"][role="alertdialog"]', { timeout: 2000 })
    .should('be.visible')
    .and('contain', 'Hubo un problema al actualizar el perfil.')
})

it('CP-EDP-005 - sin Twitter', () => {
  cy.fixture('profile').then((data) => {
    cy.get('input[aria-label="Nombre"]').eq(0).clear().type(data.nombre)
    cy.get('input[aria-label="Nombre de usuario"]').clear().type(data.usuario)
    cy.get('input[aria-label="Teléfono"]').clear().type(data.telefono)
    cy.get('input[aria-label="LinkedIn"]').clear().type(data.linkedin)
    cy.get('input[aria-label="Twitter"]').clear()
    cy.get('input[aria-label="Instagram"]').clear().type(data.instagram)
    cy.get('input[aria-label="TikTok"]').clear().type(data.tiktok)
  })

  cy.get('[data-cy="btn-save-profile"]').click()
  cy.get('[aria-label="toast"][role="alertdialog"]', { timeout: 2000 })
    .should('be.visible')
    .and('contain', 'Hubo un problema al actualizar el perfil.')
})

it('CP-EDP-006 - sin Instagram', () => {
  cy.fixture('profile').then((data) => {
    cy.get('input[aria-label="Nombre"]').eq(0).clear().type(data.nombre)
    cy.get('input[aria-label="Nombre de usuario"]').clear().type(data.usuario)
    cy.get('input[aria-label="Teléfono"]').clear().type(data.telefono)
    cy.get('input[aria-label="LinkedIn"]').clear().type(data.linkedin)
    cy.get('input[aria-label="Twitter"]').clear().type(data.twitter)
    cy.get('input[aria-label="Instagram"]').clear()
    cy.get('input[aria-label="TikTok"]').clear().type(data.tiktok)
  })

  cy.get('[data-cy="btn-save-profile"]').click()
  cy.get('[aria-label="toast"][role="alertdialog"]', { timeout: 2000 })
    .should('be.visible')
    .and('contain', 'Hubo un problema al actualizar el perfil.')
})

it('CP-EDP-007 - sin TikTok', () => {
  cy.fixture('profile').then((data) => {
    cy.get('input[aria-label="Nombre"]').eq(0).clear().type(data.nombre)
    cy.get('input[aria-label="Nombre de usuario"]').clear().type(data.usuario)
    cy.get('input[aria-label="Teléfono"]').clear().type(data.telefono)
    cy.get('input[aria-label="LinkedIn"]').clear().type(data.linkedin)
    cy.get('input[aria-label="Twitter"]').clear().type(data.twitter)
    cy.get('input[aria-label="Instagram"]').clear().type(data.instagram)
    cy.get('input[aria-label="TikTok"]').clear()
  })

  cy.get('[data-cy="btn-save-profile"]').click()
  cy.get('[aria-label="toast"][role="alertdialog"]', { timeout: 2000 })
    .should('be.visible')
    .and('contain', 'Hubo un problema al actualizar el perfil.')
})


  
 
})