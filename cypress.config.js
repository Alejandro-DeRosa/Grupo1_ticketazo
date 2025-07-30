const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // Base URL de la aplicación bajo prueba
    baseUrl: 'https://vps-3696213-x.dattaweb.com',

    // Dónde están tus specs
    specPattern: 'cypress/e2e/**/*.cy.js',

    // Archivo de soporte (commands, hooks, etc.)
    supportFile: 'cypress/support/index.js',

    // Timeouts ajustados (útiles para Next.js u SPAs)
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    
    // Reintentos en caso de fallo
    retries: {
      runMode: 2,
      openMode: 0
    },

    // Habilitar video y capturas en fallo
    video: true,
    screenshotOnRunFailure: true,
    
    // Viewport por defecto
    viewportWidth: 1280,
    viewportHeight: 720,

    // Variables de entorno custom
    env: {
      loginRoute: '/auth/login'
    },

    setupNodeEvents(on, config) {
      // Evento después de cada spec para generar reporte
      on('after:spec', (spec, results) => {
        if (results && results.video) {
          console.log('Video guardado en:', results.video)
        }
      })

      return config
    }
  },

  // Configuración global del reporter
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    charts: true
  }
})