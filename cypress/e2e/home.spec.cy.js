/// <reference types="cypress" />

describe('HOME – Ticketazo', () => {
  const testData = {
    credentials: { 
      email: 'admin@admin.com', 
      password: 'admin' 
    },
    searchTerm: 'Concierto',
    searchNoResults: 'xyzabc123evento',
    category: 'Concierto',
    province: 'Buenos Aires',
    dateFrom: '2025-08-01',
    dateTo: '2025-08-31'
  }

  before(() => {
    // Login una vez antes de todos los tests
    cy.clearSession()
    cy.loginIfNeeded(testData.credentials.email, testData.credentials.password)
  })

  beforeEach(() => {
    // Visitar home antes de cada test
    cy.visit('/')
    // Esperar que la página cargue completamente
    cy.get('body').should('be.visible')
  })

  it('TC-HOME-01 | Verificar elementos del header y navegación', () => {
    // Verificar logo
    cy.get('nav img, header img', { timeout: 10000 })
      .first()
      .should('be.visible')
    
    // Verificar enlaces de navegación principales
    cy.get('nav').should('be.visible')
    
    // BUG ESPERADO: Verificar botón "Cargar evento" (debería fallar)
    cy.contains('button, a', /cargar evento/i).should('exist')
    
    // Verificar link "Mis entradas"
    cy.contains('a', /mis entradas/i).should('exist')
    
    // Verificar que existe opción de logout (indica sesión activa)
    cy.get('nav').within(() => {
      cy.contains(/logout|salir|cerrar sesión/i).should('exist')
    })
  })

  it('TC-HOME-02 | Buscar eventos por texto', () => {
    // Buscar el campo de búsqueda
    cy.get('input[type="search"], input[type="text"]')
      .first()
      .as('searchInput')
    
    // Realizar búsqueda
    cy.get('@searchInput')
      .clear()
      .type(`${testData.searchTerm}{enter}`)
    
    // Verificar que la URL cambió con el parámetro de búsqueda
    cy.url().should('include', 'search=')
    
    // Verificar que hay resultados
    cy.get('.card, article, [class*="event"]', { timeout: 10000 })
      .should('exist')
      .and('have.length.greaterThan', 0)
      
    // Verificar que los resultados contienen el término buscado
    cy.get('.card, article').first()
      .should('contain.text', testData.searchTerm)
  })

  it('TC-HOME-03 | Búsqueda sin resultados - verificar mensaje', () => {
    // BUG ESPERADO: No muestra mensaje adecuado
    cy.get('input[type="search"], input[type="text"]').first()
      .clear()
      .type(`${testData.searchNoResults}{enter}`)
    
    cy.wait(2000)
    
    // Debería mostrar mensaje "No se encontraron eventos"
    cy.contains(/no se encontraron|sin resultados|no hay eventos/i)
      .should('be.visible')
  })

  it('TC-HOME-04 | Filtrar eventos por categoría', () => {
    // Buscar y seleccionar categoría
    cy.get('select').then($selects => {
      const categorySelect = Array.from($selects).find(el => 
        el.innerHTML.toLowerCase().includes('concierto') || 
        el.innerHTML.toLowerCase().includes('teatro')
      )
      
      if (categorySelect) {
        cy.wrap(categorySelect).select(testData.category)
      }
    })
    
    cy.wait(1000)
    
    // Verificar que los eventos mostrados son de la categoría seleccionada
    cy.get('.card, article').each($card => {
      cy.wrap($card).should('contain.text', testData.category)
    })
  })

  it('TC-HOME-05 | Filtros múltiples simultáneos', () => {
    // Aplicar búsqueda
    cy.get('input[type="search"], input[type="text"]').first()
      .type(testData.searchTerm)
    
    // Aplicar categoría
    cy.get('select').first().select(testData.category)
    
    // Aplicar fechas
    cy.get('input[type="date"]').first().type(testData.dateFrom)
    cy.get('input[type="date"]').last().type(testData.dateTo)
    
    cy.wait(1000)
    
    // Verificar que hay resultados con todos los filtros
    cy.get('.card, article').should('have.length.greaterThan', 0)
  })

  it('TC-HOME-06 | Limpiar todos los filtros - verificar bug', () => {
    // Aplicar filtros primero
    const searchText = 'test busqueda'
    cy.get('input[type="search"], input[type="text"]').first()
      .type(searchText)
    
    cy.get('input[type="date"]').first()
      .type(testData.dateFrom)
    
    // Buscar y hacer click en botón limpiar
    cy.contains('button', /limpiar|borrar|reset/i).click()
    
    // BUG ESPERADO: El campo de búsqueda no se limpia
    cy.get('input[type="search"], input[type="text"]').first()
      .should('have.value', '') // Esto debería fallar por el bug
    
    cy.get('input[type="date"]').each($input => {
      cy.wrap($input).should('have.value', '')
    })
  })

  it('TC-HOME-07 | Verificar paginación', () => {
    // BUG ESPERADO: No existe paginación
    // Verificar si hay más de 10 eventos
    cy.get('.card, article').then($cards => {
      if ($cards.length > 10) {
        // Debería existir paginación
        cy.get('.pagination, [class*="page"], nav[aria-label="pagination"]')
          .should('exist')
        
        // Verificar botones de página
        cy.contains(/siguiente|next|→/i).should('exist')
        cy.contains(/2|página 2/i).should('exist')
      }
    })
  })

  it('TC-HOME-08 | Ver detalle de un evento', () => {
    // Click en el primer evento
    cy.get('.card, article, [class*="event"]').first().within(() => {
      cy.get('a, button').contains(/ver|detalle|más info/i).click()
    })
    
    // Verificar que navegamos al detalle
    cy.url().should('match', /\/event\/\d+|\/evento\/\d+/)
    
    // Verificar elementos del detalle
    cy.get('h1, h2').first().should('be.visible') // Título
    cy.contains(/fecha/i).should('be.visible')
    cy.contains(/lugar|ubicación/i).should('be.visible')
    cy.contains(/precio/i).should('be.visible')
    cy.contains(/comprar entrada|comprar ticket/i).should('be.visible')
  })

  it('TC-HOME-09 | Verificar imagen ampliable en detalle', () => {
    // Ir al detalle de un evento
    cy.get('.card, article').first().click()
    
    // BUG ESPERADO: Click en imagen no la amplía
    cy.get('img[alt*="evento"], .event-image, [class*="event"] img').first()
      .click()
    
    // Debería abrir modal o ampliar imagen
    cy.get('.modal, [class*="modal"], [class*="lightbox"]')
      .should('be.visible')
  })

  it('TC-HOME-10 | Medir performance - tiempo de carga', () => {
    // Medir tiempo de carga de la página
    const startTime = new Date().getTime()
    
    cy.visit('/')
    cy.get('.card, article').should('be.visible')
    
    cy.then(() => {
      const loadTime = new Date().getTime() - startTime
      // BUG ESPERADO: Tarda más de 3 segundos
      expect(loadTime).to.be.lessThan(3000) // Debería fallar si tarda más de 3s
    })
  })
})