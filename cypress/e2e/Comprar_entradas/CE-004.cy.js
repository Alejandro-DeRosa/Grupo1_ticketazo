describe('Comprar entradas con ubicaciones separadas', () => {

  it('Test para cuatro butacas separadas', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/')
    cy.wait(1500)
    cy.get('.justify-end > .text-sm').click()
    cy.get('[data-cy="input-email"]').type('pruebasticketazo@gmail.com')
    cy.get('[data-cy="input-password"]').type('Pruebasticketazo1.')
    cy.get('[data-cy="btn-login"]').click()
    cy.wait(1000)
    cy.get('[data-cy="evento-card-4"] [data-cy="evento-titulo"]').should('have.text','Esperando la Carroza')
    cy.get('[data-cy="btn-ver-evento-4"]').click()
    cy.wait(1500)
    cy.get('[class="text-3xl font-bold mb-2"]').should('have.text','Esperando la Carroza')
    cy.contains('button','Adquirir entrada').scrollIntoView().should('be.visible').click()
    cy.wait(1000)

    // Redirige a Mapa de Sectores
    cy.contains('button','Con Butacas').click()
    cy.wait(500)

    const seleccionadas = []
    cy.get('button.bg-orange-500:not(:disabled)').then(botones => {
      for (let i = 0; i < botones.length && seleccionadas.length < 4; i++) {
        const btn = botones[i]
        const title = btn.getAttribute('title')
        const match = title?.match(/Fila\s*(\d+),\s*Columna\s*(\d+)/i)

        if (match) {
          const fila = match[1]
          const columna = Number(match[2])
          const clave = `F${fila} C${columna}`

          const yaExiste = seleccionadas.some(sel => sel === clave)
          const muyCerca = seleccionadas.some(sel => {
            const [f, c] = sel.match(/\d+/g).map(Number)
            return f === Number(fila) && Math.abs(c - columna) <= 1
          })

          if (!yaExiste && !muyCerca) {
            btn.click()
            seleccionadas.push(clave)
          }
        }
      }

      if (seleccionadas.length < 4) {
        throw new Error('No se encontraron suficientes butacas separadas.')
      }
    cy.wrap(seleccionadas).as('entradasSeparadas')

    cy.contains('Asientos Seleccionados')
      .parent()
      .within(() => {
        seleccionadas.forEach(txt => {
          cy.contains(txt).should('exist')
        })
      })
    cy.contains('button', /^Comprar/).click()

    cy.get('@entradasSeparadas').then(entradas => {
      cy.get('.p-6').within(() => {
        cy.contains('Resumen de Compra').should('exist')
        cy.contains('Esperando la Carroza').should('exist')
        cy.contains('Entradas seleccionadas:').should('exist')
        entradas.forEach(txt => {
          cy.get('ul.list-disc > li').should('contain.text', txt)
        })
      })

      cy.get('.p-8').within(() => {
        cy.contains('Método de Pago').should('exist')
        cy.contains('Este evento es gratuito.').should('exist')
      })
    cy.get('.mt-6 > .z-0').click()

    //Redirige a Mis Entradas 
    cy.wait(2000)
    cy.contains('Mis Entradas').should('exist')
    cy.get('[data-cy="ticket-card-4"] [data-cy="ticket-titulo"]').should('have.text','Esperando la Carroza')
    cy.get('[data-cy="btn-ver-entradas-4"]').click()
    cy.wait(1500)
    cy.get('[data-cy="modal-tickets-grupo"]').within(() => {
      entradas.forEach(txt => {
        cy.contains(txt).should('exist')
          })
        })
      })
    })
  })
})
