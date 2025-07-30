describe('Comprar sin estar logueado previamente', () => {
  
  it('Test de compra sin logueo previo', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/')
    cy.wait(1500)
    cy.get('[data-cy="evento-card-7"] [data-cy="evento-titulo"]').should('have.text','Grido Tech Advance')
    cy.get('[data-cy="btn-ver-evento-7"]').click()
    cy.wait(1500)
    cy.get('[class="text-3xl font-bold mb-2"]').should('have.text','Grido Tech Advance')
    cy.get('section[role="dialog"]')
    cy.contains('button','Adquirir entrada').scrollIntoView().should('be.visible').click()
    cy.wait(1000)

    // Redirige a Login
    cy.get('[data-cy="input-email"]').type('pruebasticketazo@gmail.com')
    cy.get('[data-cy="input-password"]').type('Pruebasticketazo1.')
    cy.get('[data-cy="btn-login"]').click()
    cy.wait(1000)

    // Redirige a Mapa de sectores
    cy.get('.mx-auto > .relative > .transition-all').click()

    cy.get('button.bg-orange-500:not(:disabled)')
      .first()
      .click()
      .then($btn => {
        const title = $btn.attr('title')
        const match = title.match(/Fila\s*(\d+),\s*Columna\s*(\d+)/i)
        if (!match) throw new Error(`Formato inesperado en title: ${title}`)

        const fila = match[1]
        const columna = match[2]
        const textoAbreviado = `F${fila} C${columna}`
        cy.wrap(textoAbreviado).as('textoAbreviado')

    cy.contains('Asientos Seleccionados')
      .parent()
      .should('contain.text', textoAbreviado)
    })
    cy.contains('button', /^Comprar/).click()

    cy.get('@textoAbreviado').then(texto => {
      cy.get('.p-6').within(() => {
        cy.contains('Resumen de Compra').should('exist')
        cy.contains('Grido Tech Advance').should('exist')
        cy.contains('Entradas seleccionadas:').should('exist')
        cy.get('ul.list-disc > li').should('contain.text', texto)
      })
      cy.get('.p-8').within(() => {
        cy.contains('Método de Pago').should('exist')
        cy.contains('Este evento es gratuito.').should('exist')
      })
    cy.get('.mt-6 > .z-0').click()

    //Redirige a Mis Entradas
    cy.contains('Mis Entradas').should('exist')
    cy.get('[data-cy="ticket-card-7"] [data-cy="ticket-titulo"]').should('have.text','Grido Tech Advance')
    cy.get('[data-cy="btn-ver-entradas-7"]').click()
    cy.wait(1500)
    cy.get('@textoAbreviado').then(texto => {
    cy.get('[data-cy="modal-tickets-grupo"]').within(() => {
    cy.get('*').should('contain.text', texto)
    })
   })
  })
 })
})
