const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  screenshotOnRunFailure: true,
  video: true,  

  e2e: {
    setupNodeEvents(on, config) {
      // actualiza contraseña de usuario "alejandro" en el archivo users.json
      on('task', {
        actualizarPassword() {
          const filePath = path.resolve(__dirname, 'cypress/fixtures/editarPasswordUser.json');
          const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

          const temp = users.alejandro.password;
          users.alejandro.password = users.alejandro.newPassword;
          users.alejandro.newPassword = temp;

          fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
          return null;
        }
      });
    return config;
    },
    baseUrl: 'https://vps-3696213-x.dattaweb.com'
  },
});
