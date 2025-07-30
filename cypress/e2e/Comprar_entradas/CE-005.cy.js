describe('Comprar entradas no numeradas', () => {
    
    it('Test para dos entradas en sector Campo', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/compra/Evento%20Multiple%20Free?horario=36')
    cy.wait(1500)
    cy.get('[data-cy="input-email"]').type('pruebasticketazo@gmail.com')
    cy.get('[data-cy="input-password"]').type('Pruebasticketazo1.')
    cy.get('[data-cy="btn-login"]').click()
    cy.wait(1000)

    //Redirige al Mapa de Sectores de Evento Multiple Free
    cy.contains('button','Campo').click()
    cy.wait(500)
    cy.contains('button','+').should('be.visible').click().click()
    cy.get('.w-full > span').should('have.text','Comprar 2 Entradas').click()

    cy.get('.p-6').within(() => {
    cy.contains('Resumen de Compra').should('exist')
    cy.contains('Evento Multiple Free').should('exist')
    cy.contains('Entradas seleccionadas:').should('exist')
    cy.contains('li', 'Campo 1').should('exist')
    cy.contains('li', 'Campo 2').should('exist')
    })
    
    cy.get('.p-8').within(() => {
    cy.contains('Método de Pago').should('exist')
    cy.contains('Este evento es gratuito.').should('exist')
    })
    cy.get('.mt-6 > .z-0').click()

    //Redirige a la página Mis Entradas
    cy.contains('Mis Entradas').should('exist')
    cy.get('[data-cy="ticket-card-10"] [data-cy="ticket-titulo"]').should('have.text','Evento Multiple Free')
    cy.get('[data-cy="btn-ver-entradas-10"]').click()
    cy.wait(1500)
    cy.get('[data-cy="modal-tickets-grupo"]').within(() => {
    cy.contains(/Asiento: Campo/).scrollIntoView().should('exist')
    cy.contains(/Asiento: Campo/).scrollIntoView().should('exist')
    })
  })
})