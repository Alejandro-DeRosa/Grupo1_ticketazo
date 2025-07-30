describe('Cargar evento', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('/newEvent')
    cy.loginEvento()
  })

  it('CP-EVENTO-001 - Cargar función completa', () => {
    // Paso 1 - Datos básicos
    cy.get('[data-cy="input-titulo"]').type('Test')
    cy.get('[aria-label="día, "]').click().type('20')
    cy.get('[aria-label="mes, "]').click().type('08')
    cy.get('[data-type="hour"]').eq(0).click().type('12')
    cy.get('[data-type="minute"]').eq(0).click().type('12')
    cy.wait(1000)
    cy.get('[data-type="hour"]').eq(1).click().type('12')
    cy.get('[data-type="minute"]').eq(1).click().type('12')

    // Paso 2 - Edad y género
    cy.contains('Seleccionar edad').click({ force: true })
    cy.get('[role="listbox"]').eq(0).within(() => {
      cy.contains('ATP').click({ force: true })
    })

    cy.contains('Seleccionar genero').click({ force: true })
    cy.get('[role="listbox"]').eq(1).within(() => {
      cy.contains('Fiesta').click({ force: true })
    })

    // Paso 3 - Lugar
    cy.wait(1000)
    cy.get('[data-cy="select-lugar-evento"]').click({ force: true })
    cy.wait(1000)
    cy.get('[data-cy="option-lugar-7"]').click()

    cy.get('[data-cy="input-nombre-lugar"]').type('test')
    cy.get('[data-cy="input-calle-lugar"]').type('test')
    cy.get('[data-cy="input-altura-lugar"]').type('test')
    cy.get('[data-cy="input-codigo-postal-lugar"]').type('1234')

    cy.get('[aria-label="Provincia"]').click()
    cy.contains('Buenos Aires').click({ force: true })

    cy.get('[aria-label="Localidad"]').click()
    cy.contains('11 de Septiembre').click({ force: true })

    cy.get('[data-cy="input-info"]').type('Test')
    cy.contains('Siguiente').click()

    // Paso 4 - Entrada
    cy.get('[aria-haspopup="listbox"]').click()
    cy.get('[role="listbox"]').eq(0).within(() => {
      cy.contains('General').click({ force: true })
    })
    cy.get('[aria-label="Capacidad"]').type('12')
    cy.get('[aria-label="Precio Entrada"]').type('12')
    cy.contains('Siguiente').click()

    // Paso 5 - Imagen y confirmación
    cy.get('input[type="file"]').attachFile('evento.jpg')
    cy.contains('Siguiente').click()
    cy.contains('Confirmar').click()

    cy.get('[aria-label="toast"][role="alertdialog"]', { timeout: 5000 })
    .should('be.visible')
    .and('contain', 'Tu evento fue guardado y está pendiente de aprobación.')
  })
})