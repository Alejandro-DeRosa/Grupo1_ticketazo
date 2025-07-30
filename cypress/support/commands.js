// cypress/support/commands.js

// Comando para login condicional
Cypress.Commands.add('loginIfNeeded', (email, password) => {
  cy.visit('/')
  cy.url().then(url => {
    if (url.includes('/auth/login')) {
      cy.log('Usuario no autenticado, realizando login...')
      cy.get('input[name="email"]').clear().type(email)
      cy.get('input[name="password"]').clear().type(password)
      cy.get('button[type="submit"]').click()
      // Espera redirección después del login
      cy.url().should('not.include', '/auth/login')
      cy.url().should('eq', Cypress.config('baseUrl') + '/')
    } else {
      cy.log('Usuario ya autenticado')
    }
  })
})

// Comando para limpiar localStorage y cookies
Cypress.Commands.add('clearSession', () => {
  cy.clearCookies()
  cy.clearLocalStorage()
  cy.window().then((win) => {
    win.sessionStorage.clear()
  })
})

// Comando para verificar elemento visible con retry
Cypress.Commands.add('waitAndClick', (selector, options = {}) => {
  const defaultOptions = { timeout: 10000, ...options }
  cy.get(selector, defaultOptions)
    .should('be.visible')
    .scrollIntoView()
    .click()
})

// Comando para esperar carga de la página
Cypress.Commands.add('waitForPageLoad', () => {
  cy.intercept('GET', '**/api/**').as('apiCall')
  cy.wait('@apiCall', { timeout: 15000 })
})