/// <reference types="cypress" />

describe('AUTENTICACIÓN – Ticketazo', () => {
  beforeEach(() => {
    // Limpiar sesión antes de cada test
    cy.clearSession()
  })

  it('TC-AUTH-01 | Login exitoso con credenciales válidas', () => {
    cy.visit('/auth/login')
    
    // Completar formulario
    cy.get('input[name="email"]').type('admin@admin.com')
    cy.get('input[name="password"]').type('admin')
    
    // Submit
    cy.get('button[type="submit"]').click()
    
    // Verificar redirección exitosa
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
    
    // Verificar que el usuario está logueado
    cy.contains(/logout|salir|cerrar sesión/i).should('exist')
  })

  it('TC-AUTH-02 | Login fallido con credenciales inválidas', () => {
    cy.visit('/auth/login')
    
    // Intentar con credenciales incorrectas
    cy.get('input[name="email"]').type('usuario@invalido.com')
    cy.get('input[name="password"]').type('passwordincorrecta')
    cy.get('button[type="submit"]').click()
    
    // Verificar mensaje de error
    cy.contains(/error|incorrecto|inválido/i).should('be.visible')
    
    // Verificar que seguimos en login
    cy.url().should('include', '/auth/login')
  })

  it('TC-AUTH-03 | Validación de campos requeridos en login', () => {
    cy.visit('/auth/login')
    
    // Intentar submit sin datos
    cy.get('button[type="submit"]').click()
    
    // Verificar mensajes de validación
    cy.get('input[name="email"]:invalid').should('exist')
    cy.get('input[name="password"]:invalid').should('exist')
  })

  it('TC-AUTH-04 | Logout exitoso', () => {
    // Primero hacer login
    cy.loginIfNeeded('admin@admin.com', 'admin')
    
    // Hacer logout
    cy.contains(/logout|salir|cerrar sesión/i).click()
    
    // Verificar redirección a login
    cy.url().should('include', '/auth/login')
  })

  it('TC-AUTH-05 | Protección de rutas - Redirección sin autenticación', () => {
    // Intentar acceder a ruta protegida sin login
    cy.visit('/mis-entradas')
    
    // Verificar redirección a login
    cy.url().should('include', '/auth/login')
  })
})