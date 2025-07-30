describe('Editar contraseña - Casos exitosos', () =>{
    // Declaracion de variables para almacenar las credenciales del usuario
    let userName;
    let password;
    let newPassword;

    // Carga las credenciales del usuario desde el fixture antes de ejecutar los tests
    before(() =>{
        cy.fixture('editarPasswordUser.json').then(credenciales => {
            userName = credenciales.alejandro.usuario;
            password = credenciales.alejandro.password;
            newPassword = credenciales.alejandro.newPassword;
        });
    });

    // Configuración del viewport y visita a la página de login antes de cada test
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.inicioSesion(userName, password);
        cy.contains('Mi perfil').click();
    });

    // Actualiza la contraseña del usuario "alejandro" en el archivo users.json al terminar los tests
    after(() =>{
        cy.task('actualizarPassword');
    });


    it('CP-EDP-001 - Validar poder editar la contraseña de usuario', () => {
        cy.intercept('PUT', '/api/backend/auth/change-password').as('statusChangePassword');

        cy.url().should('eq', 'https://vps-3696213-x.dattaweb.com/userProfile');
        cy.get('[data-cy="btn-editar-password"]').click();
        cy.get('[data-cy="input-password-actual"]').type(password);
        cy.get('[data-cy="input-password-nueva"]').type(newPassword);
        cy.get('[data-cy="btn-guardar-password"]').click();

        cy.verificarAlert('Contraseña actualizada correctamente');

        cy.wait('@statusChangePassword').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
    });

});