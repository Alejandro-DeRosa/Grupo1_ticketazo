describe('Comprar entradas con ubicaciones consecutivas', () => {

  it('Test para tres butacas consecutivas', () => {
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
    cy.contains('button','Adquirir entrada').scrollIntoView().should('be.visible').click()
    cy.wait(1000)

    // Redirige a Mapa de Sectores
    cy.get('.mx-auto > .relative > .transition-all').click()
    const seleccionadas = []
    cy.get('button.bg-orange-500:not(:disabled)').then(botones => {
      for (let i = 0; i < botones.length - 2; i++) {
        const btn1 = botones[i]
        const btn2 = botones[i + 1]
        const btn3 = botones[i + 2]

        const t1 = btn1.getAttribute('title')
        const t2 = btn2.getAttribute('title')
        const t3 = btn3.getAttribute('title')

        const match1 = t1?.match(/Fila\s*(\d+),\s*Columna\s*(\d+)/i)
        const match2 = t2?.match(/Fila\s*(\d+),\s*Columna\s*(\d+)/i)
        const match3 = t3?.match(/Fila\s*(\d+),\s*Columna\s*(\d+)/i)

        if (match1 && match2 && match3) {
          const f1 = match1[1], c1 = Number(match1[2])
          const f2 = match2[1], c2 = Number(match2[2])
          const f3 = match3[1], c3 = Number(match3[2])

          if (f1 === f2 && f2 === f3 && c2 === c1 + 1 && c3 === c2 + 1) {
            btn1.click()
            btn2.click()
            btn3.click()

            seleccionadas.push(`F${f1} C${c1}`, `F${f2} C${c2}`, `F${f3} C${c3}`)
            break
          }
        }
      }
    cy.wrap(seleccionadas).as('entradasSeleccionadas')

    cy.contains('Asientos Seleccionados')
      .parent()
       .should('exist')
       .within(() => {
          seleccionadas.forEach(texto => {
            cy.contains(texto).should('exist')
        })
       })
    cy.contains('button', /^Comprar/).click()

   cy.get('@entradasSeleccionadas').then(entradas => {
     cy.get('.p-6').within(() => {
       cy.contains('Resumen de Compra').should('exist')
       cy.contains('Grido Tech Advance').should('exist')
       cy.contains('Entradas seleccionadas:').should('exist')

       entradas.forEach(texto => {
        cy.get('ul.list-disc > li').should('contain.text', texto)
       })
      })

     cy.get('.p-8').within(() => {
      cy.contains('Método de Pago').should('exist')
      cy.contains('Este evento es gratuito.').should('exist')
     })

   cy.get('.mt-6 > .z-0').click()

   // Mis Entradas
   cy.contains('Mis Entradas').should('exist')
   cy.get('[data-cy="ticket-card-7"] [data-cy="ticket-titulo"]').should('have.text','Grido Tech Advance')
   cy.get('[data-cy="btn-ver-entradas-7"]').click()
   cy.wait(1500)
   cy.get('[data-cy="modal-tickets-grupo"]').within(() => {
   entradas.forEach(texto => {
    cy.contains(texto).should('exist')
   })
  })

      })
    })
  })
})
