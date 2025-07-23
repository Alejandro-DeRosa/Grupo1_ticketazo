describe('Editar contraseña - Casos fallidos', () =>{
    // Declaracion de variables para almacenar las credenciales del usuario
    let userName;
    let password;
    let newPassword;
    
    // Carga las credenciales del usuario desde el fixture antes de ejecutar los tests
    before(() => {
        cy.fixture('users.json').then(credenciales => {
            userName = credenciales.alejandro.usuario;
            password = credenciales.alejandro.password;
            newPassword = credenciales.alejandro.newPassword;
        });
    }); 

    // Configuración del viewport y visita a la página de login antes de cada test
    beforeEach(() => {
        cy.viewport(1280,720);
        cy.inicioSesion(userName, password);
        cy.contains('Mi perfil').click();
    });
    

    it('CP-EDP-002 - Validar no poder editar la contraseña cuando la nueva contraseña es igual a la actual', () => {
        cy.intercept('PUT', '/api/backend/auth/change-password').as('statusChangePassword');

        cy.get('[data-cy="btn-editar-password"]').click();
        cy.get('[data-cy="input-password-actual"]').type(password);
        cy.get('[data-cy="input-password-nueva"]').type(password);
        cy.get('[data-cy="btn-guardar-password"]').click();

        cy.verificarAlert('La nueva contraseña no puede ser igual a la actual');

        cy.wait('@statusChangePassword').then((interception) => {
            expect(interception.response.statusCode).to.eq(400);
        });
    });


    it('CP-EDP-003 - Validar no poder editar la contraseña al dejar los campos vacios', () => {
        cy.intercept('PUT', '/api/backend/auth/change-password').as('statusChangePassword');

        cy.get('[data-cy="btn-editar-password"]').click();
        cy.get('[data-cy="btn-guardar-password"]').click();

        cy.verificarAlert('Contraseña actual y nueva son requeridas');

        cy.wait('@statusChangePassword').then((interception) => {
            expect(interception.response.statusCode).to.eq(400);
        });
    });


    it('CP-EDP-004 - Validar no poder editar la contraseña al ingresar una contraseña actual incorrecta', () => {
        let currentPassIncorrect = 'Incorrecto1324';

        cy.intercept('PUT', '/api/backend/auth/change-password').as('statusChangePassword');

        cy.get('[data-cy="btn-editar-password"]').click();
        cy.get('[data-cy="input-password-actual"]').type(currentPassIncorrect);
        cy.get('[data-cy="input-password-nueva"]').type(newPassword);
        cy.get('[data-cy="btn-guardar-password"]').click();

        cy.verificarAlert('Contraseña actual incorrecta');

        cy.wait('@statusChangePassword').then((interception) => {
            expect(interception.response.statusCode).to.eq(401);
        });
    });


    it('CP-EDP-005 - Validar no poder editar la contraseña cuando la nueva contraseña tiene menos de 8 caracteres', () =>{
        let shortNewPass = 'So12345';
        
        cy.intercept('PUT', '/api/backend/auth/change-password').as('statusChangePassword');

        cy.get('[data-cy="btn-editar-password"]').click();
        cy.get('[data-cy="input-password-actual"]').type(password);
        cy.get('[data-cy="input-password-nueva"]').type(shortNewPass);
        cy.get('[data-cy="btn-guardar-password"]').click();

        cy.verificarAlert('La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');

        cy.wait('@statusChangePassword').then((interception) => {
            expect(interception.response.statusCode).to.eq(400);
        });
    });


    it('CP-EDP-006 - Validar no poder editar la contraseña cuando la nueva contraseña incluye caracteres especiales', () =>{
        let NewPassWithEspecialCharacter = 'So123456*';
        
        cy.intercept('PUT', '/api/backend/auth/change-password').as('statusChangePassword');

        cy.get('[data-cy="btn-editar-password"]').click();
        cy.get('[data-cy="input-password-actual"]').type(password);
        cy.get('[data-cy="input-password-nueva"]').type(NewPassWithEspecialCharacter);
        cy.get('[data-cy="btn-guardar-password"]').click();

        cy.verificarAlert('La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');

        cy.wait('@statusChangePassword').then((interception) => {
            expect(interception.response.statusCode).to.eq(400);
        });
    });


    it('CP-EDP-007 - Validar no poder editar la contraseña cuando la nueva contraseña no incluye caracteres numericos', () =>{
        let newPassWithoutNumbers = 'Solonumeros';
        
        cy.intercept('PUT', '/api/backend/auth/change-password').as('statusChangePassword');

        cy.get('[data-cy="btn-editar-password"]').click();
        cy.get('[data-cy="input-password-actual"]').type(password);
        cy.get('[data-cy="input-password-nueva"]').type(newPassWithoutNumbers);
        cy.get('[data-cy="btn-guardar-password"]').click();

        cy.verificarAlert('La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');

        cy.wait('@statusChangePassword').then((interception) => {
            expect(interception.response.statusCode).to.eq(400);
        });
    });


    it('CP-EDP-008 - Validar no poder editar la contraseña cuando la nueva contraseña no incluye letras mayusculas', () =>{
        let newPassWithoutCapitalLetters = 'so123456';
        
        cy.intercept('PUT', '/api/backend/auth/change-password').as('statusChangePassword');

        cy.get('[data-cy="btn-editar-password"]').click();
        cy.get('[data-cy="input-password-actual"]').type(password);
        cy.get('[data-cy="input-password-nueva"]').type(newPassWithoutCapitalLetters);
        cy.get('[data-cy="btn-guardar-password"]').click();

        cy.verificarAlert('La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');

        cy.wait('@statusChangePassword').then((interception) => {
            expect(interception.response.statusCode).to.eq(400);
        });
    });


    it('CP-EDP-009 - Validar no poder editar la contraseña cuando la nueva contraseña no incluye letras minisculas', () =>{
        let newPassWithoutLowercaseLetters = 'SO123456';
        
        cy.intercept('PUT', '/api/backend/auth/change-password').as('statusChangePassword');

        cy.get('[data-cy="btn-editar-password"]').click();
        cy.get('[data-cy="input-password-actual"]').type(password);
        cy.get('[data-cy="input-password-nueva"]').type(newPassWithoutLowercaseLetters);
        cy.get('[data-cy="btn-guardar-password"]').click();

        cy.verificarAlert('La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');

        cy.wait('@statusChangePassword').then((interception) => {
            expect(interception.response.statusCode).to.eq(400);
        });
    });

});