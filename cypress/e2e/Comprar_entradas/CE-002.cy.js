describe('No poder finalizar una compra si no se indica la cantidad de entradas', () => {
    
    it('Test al botón Comprar en la selección de butacas', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/')
    cy.wait(1500)
    cy.get('.justify-end > .text-sm').click()
    cy.get('[data-cy="input-email"]').type('pruebasticketazo@gmail.com')
    cy.get('[data-cy="input-password"]').type('Pruebasticketazo1.')
    cy.get('[data-cy="btn-login"]').click()
    cy.wait(1000)
    cy.get('[data-cy="evento-card-7"] [data-cy="evento-titulo"]').should('have.text','Grido Tech Advance')
    cy.get('[data-cy="btn-ver-evento-7"]').click()
    cy.wait(1500)
    cy.get('[class="text-3xl font-bold mb-2"]').should('have.text','Grido Tech Advance')
    cy.get('section[role="dialog"]')
    cy.contains('button','Adquirir entrada').scrollIntoView().should('be.visible').click()
    cy.wait(1000)
    
    //Redirige a Mapa de Sectores
    cy.get('.mx-auto > .relative > .transition-all').click()
    cy.wait(500)
    
    cy.contains('button', /^Comprar/).should('not.exist')
    cy.get('button.bg-orange-500:not(:disabled)').first().then($btn => {
      const title = $btn.attr('title')
      cy.wrap(title).as('tituloButaca')
      cy.wrap($btn).click()
    })
    cy.contains('button', /^Comprar/).should('be.visible')
    cy.get('@tituloButaca').then(title => {
      cy.get(`[title="${title}"]`).click()
    })
    cy.contains('button', /^Comprar/).should('not.exist')
  })
})