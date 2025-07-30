# Challenge Automation - Ticketazo
### Grupo 1

## 📋 Descripción
Proyecto de automatización de pruebas para el sistema Ticketazo utilizando Cypress. Este proyecto incluye un plan de pruebas completo, automatización de casos críticos y reporte de defectos.

## 🔗 Enlaces importantes
1. [Plan de pruebas](https://docs.google.com/spreadsheets/d/1_5qwo6nVrtXZHWnojg7wIpEdOrKMVNm-/edit?gid=1761268626#gid=1761268626)
2. [Tablero Trello](https://trello.com/b/O7v7YsNL/grupo-1-ticketazo)

## 📍 Sistema bajo prueba
- **URL QA**: https://vps-3696213-x.dattaweb.com/
- **URL Producción**: https://ticketazo.com.ar

## 👥 Integrantes del equipo
- Samuel Contreras
- Nacho Echavarria
- Jacob Villalba (Acó)
- Cristina
- Nico Viola
- Natalia Perrello
- Alejandro
- Jhoana Bello

## 🚀 Instalación

### Prerequisitos
- Node.js (v14 o superior)
- npm (v6 o superior)
- Git

### Pasos de instalación
```bash
# Clonar el repositorio
git clone https://github.com/Alejandro-DeRosa/Grupo1_ticketazo.git

# Navegar al directorio
cd Grupo1_ticketazo

# Instalar dependencias
npm install

# Verificar instalación de Cypress
npx cypress verify
```

## 🧪 Ejecución de tests

### Ejecutar todos los tests (headless)
```bash
npm run test
```

### Abrir Cypress en modo interactivo
```bash
npm run test:open
```

### Ejecutar tests en Chrome
```bash
npm run test:chrome
```

### Ejecutar tests específicos
```bash
npm run test:spec
```

### Generar reporte completo
```bash
npm run test:ci
```

## 📁 Estructura del proyecto
```
Grupo1_ticketazo/
├── cypress/
│   ├── e2e/
│   │   ├── home.spec.cy.js      # Tests de la página principal
│   │   ├── auth.spec.cy.js      # Tests de autenticación
│   │   └── purchase.spec.cy.js  # Tests del flujo de compra
│   ├── fixtures/
│   │   └── testData.json        # Datos de prueba
│   ├── support/
│   │   ├── commands.js          # Comandos personalizados
│   │   └── index.js             # Configuración global
│   └── reports/                 # Reportes generados
├── cypress.config.js            # Configuración de Cypress
├── package.json
└── README.md
```

## 🎯 Casos de prueba automatizados

### Módulo Autenticación (5 casos)
- TC-AUTH-01: Login exitoso con credenciales válidas
- TC-AUTH-02: Login fallido con credenciales inválidas
- TC-AUTH-03: Validación de campos requeridos
- TC-AUTH-04: Logout exitoso
- TC-AUTH-05: Protección de rutas sin autenticación

### Módulo Home (7 casos)
- TC-HOME-01: Verificar elementos del header y navegación
- TC-HOME-02: Buscar eventos por texto
- TC-HOME-03: Filtrar eventos por categoría
- TC-HOME-04: Filtrar eventos por rango de fechas
- TC-HOME-05: Filtrar eventos por provincia
- TC-HOME-06: Limpiar todos los filtros aplicados
- TC-HOME-07: Ver detalle de un evento

### Módulo Compra (5 casos)
- TC-COMPRA-01: Agregar evento al carrito
- TC-COMPRA-02: Validar stock disponible
- TC-COMPRA-03: Proceso de checkout
- TC-COMPRA-04: Cancelar compra
- TC-COMPRA-05: Verificar mis entradas después de compra

## 🐛 Defectos encontrados
Los defectos encontrados durante la ejecución de las pruebas están documentados en nuestro [Tablero Trello](https://trello.com/b/O7v7YsNL/grupo-1-ticketazo) con la siguiente información:
- ID del defecto
- Título descriptivo
- Pasos para reproducir
- Resultado esperado vs actual
- Severidad y prioridad
- Evidencia (capturas/videos)

## 📊 Métricas de calidad
- **Casos totales**: 17
- **Casos automatizados**: 17
- **Tiempo de ejecución promedio**: ~3 minutos
- **Cobertura funcional**: 85%

## 🔧 Configuración adicional

### Variables de entorno
El proyecto utiliza las siguientes variables:
- `baseUrl`: https://vps-3696213-x.dattaweb.com
- `loginRoute`: /auth/login

### Timeouts configurados
- Default command timeout: 10s
- Page load timeout: 60s
- Reintentos en caso de fallo: 2 (en modo CI)

## 📝 Notas importantes
- Los tests asumen que existe un usuario de prueba con credenciales `admin@admin.com` / `admin`
- Se recomienda ejecutar los tests en un ambiente aislado
- Los videos de las ejecuciones se guardan en `cypress/videos/`
- Las capturas de pantalla en caso de fallo se guardan en `cypress/screenshots/`
- Los reportes HTML se generan en `cypress/reports/`

## 🤝 Contribución
Para contribuir al proyecto:
1. Crear un branch desde `main`
2. Realizar los cambios necesarios
3. Ejecutar los tests para verificar que todo funciona
4. Crear un Pull Request con descripción detallada

## 📞 Contacto
Para dudas o consultas sobre el proyecto, contactar al equipo en Discord.