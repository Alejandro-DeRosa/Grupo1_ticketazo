# Challenge Automation Ticketazo

---
## 🫂 Integrantes del Grupo 1

### Integrantes:
- xxxxxxx
- xxxxxxx
- xxxxxxx
- xxxxxxx
- xxxxxxx

---
 ## 🔗 Links importantes

 - [Plan de pruebas](https://docs.google.com/spreadsheets/d/1_5qwo6nVrtXZHWnojg7wIpEdOrKMVNm-/edit?gid=1761268626#gid=1761268626)
- [Tablero Trello](https://trello.com/invite/b/688169322314236178e8b999/ATTI317bebca1227cd14fcde0b790aeabc7094959EC3/grupo-1-ticketazo)


---

## ⚙️ Precondiciones

- Tener instalado Node.js 

---

## 📦 Instalación de dependencias

Antes de ejecutar los tests, se  deben instalar las dependencias del proyecto:

```bash
npm install
```

---

## 🚀 Ejecución de tests

### Ejecutar **todos** los tests (modo headless)

```bash
npm run test
```

### Ejecutar Cypress en modo interactivo (UI)

```bash
npm run test:ui
```

---

## 🗂️ Ejecutar tests por carpeta

Cada comando ejecuta todos los archivos `*.cy.js` dentro de la carpeta correspondiente, incluyendo subcarpetas:

### 🔐 Login

```bash
npm run test:login
```

### 📝 Registro

```bash
npm run test:registro
```

### 🔒 Editar contraseña

```bash
npm run test:editar-contrasena
```

### 🏠 Home

```bash
npm run test:home
```

---

## 📁 Estructura del proyecto

```
cypress/
├── e2e/
│   ├── login/
│   ├── registro/
│   ├── editar_contraseña/
│   └── home/
├── fixtures/
├── support/
├── cypress.config.js
└── README.md
```
