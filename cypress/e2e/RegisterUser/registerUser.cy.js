import { faker } from '@faker-js/faker';

describe('Registro de usuario - Test Cases', () => {

    const nameInput = () => cy.get('[data-cy="input-nombres"]');
    const surnameInput = () => cy.get('[data-cy="input-apellido"]');
    const telephoneInput = () => cy.get('[data-cy="input-telefono"]');
    const idInput = () => cy.get('[data-cy="input-dni"]');
    const provinceInput = () => cy.get('[data-cy="select-provincia"]');
    const cityInput = () => cy.get('[data-cy="select-localidad"]');
    const dayInput = () => cy.get('[data-type="day"]');
    const monthInput = () => cy.get('[data-type="month"]');
    const yearInput = () => cy.get('[data-type="year"]');
    const emailInput = () => cy.get('[data-cy="input-email"]');
    const confirmEmailInput = () => cy.get('[data-cy="input-confirmar-email"]');
    const passwordInput = () => cy.get('[data-cy="input-password"]');
    const repeatPasswordInput = () => cy.get('[data-cy="input-repetir-password"]');
    const registerButton = () => cy.get('[data-cy="btn-registrarse"]');
    const errorMessage = () => cy.get('[data-slot="error-message"]');
    const incorrectEmailOrPasswordErrorMessage = () => cy.get('[data-cy="error-message"]');

    beforeEach(function () {
        cy.visit('https://vps-3696213-x.dattaweb.com/auth/registerUser');
        cy.fixture('registerUsers').then((users) => {
            this.users = users;
        })
    });

    it('TC01 - Completar formulario con campos válidos', function () {
        const email = faker.internet.email();
        const id = faker.string.numeric(8);
        const mail = email;

        nameInput().type(this.users.names.valid);
        surnameInput().type(this.users.surnames.valid);
        telephoneInput().type(this.users.phones.valid);
        idInput().type(id);
        provinceInput().click();
        cy.contains('Jujuy').click();
        cityInput().click();
        cy.contains('Aparzo').click();
        dayInput().type(30);
        monthInput().type(12);
        yearInput().type(1998);
        emailInput().type(mail);
        confirmEmailInput().type(mail);
        passwordInput().type(this.users.passwords.valid);
        repeatPasswordInput().type(this.users.passwords.valid);
        registerButton().click();

        cy.wait(1000);
        cy.url().should('eq', 'https://vps-3696213-x.dattaweb.com/auth/login');
    });

    it('TC02 - Dejar campos vacíos', function () {

        registerButton().click();

        cy.wait(1000);

        errorMessage().filter(':contains("Completa este campo")').should('have.length', 11);

    });

    it('TC03 - Completar Nombre con caracteres especiales', function () {
        const email = faker.internet.email();
        const id = faker.string.numeric(8);
        const mail = email;

        nameInput().type(this.users.names.withSpecialChars);
        surnameInput().type(this.users.surnames.valid);
        telephoneInput().type(this.users.phones.valid);
        idInput().type(id);
        provinceInput().click();
        cy.contains('Jujuy').click();
        cityInput().click();
        cy.contains('Aparzo').click();
        dayInput().type(30);
        monthInput().type(12);
        yearInput().type(1998);
        emailInput().type(mail);
        confirmEmailInput().type(mail);
        passwordInput().type(this.users.passwords.valid);
        repeatPasswordInput().type(this.users.passwords.valid);

        registerButton().click();

        cy.wait(1000);

        errorMessage().should('contain', 'Formato de nombre inválido')
    });

    it('TC04 - Completar Apellido con caracteres especiales', function () {
        const email = faker.internet.email();
        const id = faker.string.numeric(8);
        const mail = email;

        nameInput().type(this.users.names.valid);
        surnameInput().type(this.users.surnames.withSpecialChars);
        telephoneInput().type(this.users.phones.valid);
        idInput().type(id);
        provinceInput().click();
        cy.contains('Jujuy').click();
        cityInput().click();
        cy.contains('Aparzo').click();
        dayInput().type(30);
        monthInput().type(12);
        yearInput().type(1998);
        emailInput().type(mail);
        confirmEmailInput().type(mail);
        passwordInput().type(this.users.passwords.valid);
        repeatPasswordInput().type(this.users.passwords.valid);

        registerButton().click();

        cy.wait(1000);

        errorMessage().should('contain', 'Formato de nombre inválido')
    });

    it('TC05 - Completar Teléfono con menos de 10 dígitos', function () {
        const email = faker.internet.email();
        const id = faker.string.numeric(8);
        const mail = email;

        nameInput().type(this.users.names.valid);
        surnameInput().type(this.users.surnames.valid);
        telephoneInput().type(this.users.phones.lessThan10);
        idInput().type(id);
        provinceInput().click();
        cy.contains('Jujuy').click();
        cityInput().click();
        cy.contains('Aparzo').click();
        dayInput().type(30);
        monthInput().type(12);
        yearInput().type(1998);
        emailInput().type(mail);
        confirmEmailInput().type(mail);
        passwordInput().type(this.users.passwords.valid);
        repeatPasswordInput().type(this.users.passwords.valid);

        registerButton().click();

        cy.wait(1000);

        errorMessage().should('contain', 'Utiliza un formato que coincida con el solicitado')
    });

    it('TC06 - Completar Teléfono con caracteres especiales', function () {
        const email = faker.internet.email();
        const id = faker.string.numeric(8);
        const mail = email;

        nameInput().type(this.users.names.valid);
        surnameInput().type(this.users.surnames.valid);
        telephoneInput().type(this.users.phones.withSpecialChars);
        idInput().type(id);
        provinceInput().click();
        cy.contains('Jujuy').click();
        cityInput().click();
        cy.contains('Aparzo').click();
        dayInput().type(30);
        monthInput().type(12);
        yearInput().type(1998);
        emailInput().type(mail);
        confirmEmailInput().type(mail);
        passwordInput().type(this.users.passwords.valid);
        repeatPasswordInput().type(this.users.passwords.valid);

        registerButton().click();

        cy.wait(1000);

        errorMessage().should('contain', 'Completa este campo')
    });

    it('TC07 - Completar DNI con menos de 8 dígitos', function () {
        const email = faker.internet.email();
        const id = faker.string.numeric(8);
        const mail = email;

        nameInput().type(this.users.names.valid);
        surnameInput().type(this.users.surnames.valid);
        telephoneInput().type(this.users.phones.valid);
        idInput().type(this.users.ids.lessThan8);
        provinceInput().click();
        cy.contains('Jujuy').click();
        cityInput().click();
        cy.contains('Aparzo').click();
        dayInput().type(30);
        monthInput().type(12);
        yearInput().type(1998);
        emailInput().type(mail);
        confirmEmailInput().type(mail);
        passwordInput().type(this.users.passwords.valid);
        repeatPasswordInput().type(this.users.passwords.valid);

        registerButton().click();

        cy.wait(1000);

        errorMessage().should('contain', 'Utiliza un formato que coincida con el solicitado')
    });

    it('TC08 - Completar DNI con letras y caracteres especiales', function () {
        const email = faker.internet.email();
        const id = faker.string.numeric(8);
        const mail = email;

        nameInput().type(this.users.names.valid);
        surnameInput().type(this.users.surnames.valid);
        telephoneInput().type(this.users.phones.valid);
        idInput().type(this.users.ids.withSpecialChars);
        provinceInput().click();
        cy.contains('Jujuy').click();
        cityInput().click();
        cy.contains('Aparzo').click();
        dayInput().type(30);
        monthInput().type(12);
        yearInput().type(1998);
        emailInput().type(mail);
        confirmEmailInput().type(mail);
        passwordInput().type(this.users.passwords.valid);
        repeatPasswordInput().type(this.users.passwords.valid);

        registerButton().click();

        cy.wait(1000);

        errorMessage().should('contain', 'Completa este campo')
    });

    it('TC09 - Completar Fecha de nacimiento con una fecha futura', function () {
        const email = faker.internet.email();
        const id = faker.string.numeric(8);
        const mail = email;

        nameInput().type(this.users.names.valid);
        surnameInput().type(this.users.surnames.valid);
        telephoneInput().type(this.users.phones.valid);
        idInput().type(id);
        provinceInput().click();
        cy.contains('Jujuy').click();
        cityInput().click();
        cy.contains('Aparzo').click();
        dayInput().type(30);
        monthInput().type(12);
        yearInput().type(2030);
        emailInput().type(mail);
        confirmEmailInput().type(mail);
        passwordInput().type(this.users.passwords.valid);
        repeatPasswordInput().type(this.users.passwords.valid);

        registerButton().click();

        cy.wait(1000);

        cy.contains(/^El valor debe ser \d{1,2}\/\d{1,2}\/\d{4} o anterior\.$/).should('be.visible');
    });

    it('TC10 - Completar Email con formato inválido sin arroba', function () {
        const email = faker.internet.email();
        const id = faker.string.numeric(8);
        const mail = email;

        nameInput().type(this.users.names.valid);
        surnameInput().type(this.users.surnames.valid);
        telephoneInput().type(this.users.phones.valid);
        idInput().type(id);
        provinceInput().click();
        cy.contains('Jujuy').click();
        cityInput().click();
        cy.contains('Aparzo').click();
        dayInput().type(30);
        monthInput().type(12);
        yearInput().type(1998);
        emailInput().type(this.users.emails.invalidNoAt);
        confirmEmailInput().type(this.users.emails.invalidNoAt);
        passwordInput().type(this.users.passwords.valid);
        repeatPasswordInput().type(this.users.passwords.valid);

        registerButton().click();

        cy.wait(1000);

        errorMessage().should('contain', 'Incluye un signo "@" en la dirección de correo electrónico. La dirección "mail.com" no incluye el signo "@".')
    });

    it('TC11 - Completar Confirmar Email con un email distinto', function () {
        const email = faker.internet.email();
        const id = faker.string.numeric(8);
        const mail = email;

        nameInput().type(this.users.names.valid);
        surnameInput().type(this.users.surnames.valid);
        telephoneInput().type(this.users.phones.valid);
        idInput().type(id);
        provinceInput().click();
        cy.contains('Jujuy').click();
        cityInput().click();
        cy.contains('Aparzo').click();
        dayInput().type(30);
        monthInput().type(12);
        yearInput().type(1998);
        emailInput().type(mail);
        confirmEmailInput().type(this.users.emails.valid);
        passwordInput().type(this.users.passwords.valid);
        repeatPasswordInput().type(this.users.passwords.valid);

        registerButton().click();

        cy.wait(1000);

        incorrectEmailOrPasswordErrorMessage().should('contain', 'Los correos electrónicos no coinciden')
    });

    it('TC12 - Completar Contraseña con menos de 8 caracteres', function () {
        const email = faker.internet.email();
        const id = faker.string.numeric(8);
        const mail = email;

        nameInput().type(this.users.names.valid);
        surnameInput().type(this.users.surnames.valid);
        telephoneInput().type(this.users.phones.valid);
        idInput().type(id);
        provinceInput().click();
        cy.contains('Jujuy').click();
        cityInput().click();
        cy.contains('Aparzo').click();
        dayInput().type(30);
        monthInput().type(12);
        yearInput().type(1998);
        emailInput().type(mail);
        confirmEmailInput().type(mail);
        passwordInput().type(this.users.passwords.lessThan8);
        repeatPasswordInput().type(this.users.passwords.lessThan8);

        registerButton().click();

        cy.wait(1000);

        incorrectEmailOrPasswordErrorMessage().should('contain', 'La contraseña debe tener al menos 8 caracteres')
    });

    it('TC13 - Completar Contraseña con formato inválido', function () {
        const email = faker.internet.email();
        const id = faker.string.numeric(8);
        const mail = email;

        nameInput().type(this.users.names.valid);
        surnameInput().type(this.users.surnames.valid);
        telephoneInput().type(this.users.phones.valid);
        idInput().type(id);
        provinceInput().click();
        cy.contains('Jujuy').click();
        cityInput().click();
        cy.contains('Aparzo').click();
        dayInput().type(30);
        monthInput().type(12);
        yearInput().type(1998);
        emailInput().type(mail);
        confirmEmailInput().type(mail);
        passwordInput().type(this.users.passwords.invalidNoNumbersAndSpecialCharacters);
        repeatPasswordInput().type(this.users.passwords.invalidNoNumbersAndSpecialCharacters);

        registerButton().click();

        cy.wait(1000);

        incorrectEmailOrPasswordErrorMessage().should('contain', 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.')
    });

    it('TC14 - Completar Confirmar Contraseña con una contraseña distinta', function () {
        const email = faker.internet.email();
        const id = faker.string.numeric(8);
        const mail = email;

        nameInput().type(this.users.names.valid);
        surnameInput().type(this.users.surnames.valid);
        telephoneInput().type(this.users.phones.valid);
        idInput().type(id);
        provinceInput().click();
        cy.contains('Jujuy').click();
        cityInput().click();
        cy.contains('Aparzo').click();
        dayInput().type(30);
        monthInput().type(12);
        yearInput().type(1998);
        emailInput().type(mail);
        confirmEmailInput().type(mail);
        passwordInput().type(this.users.passwords.valid);
        repeatPasswordInput().type(this.users.passwords.anotherValid);

        registerButton().click();

        cy.wait(1000);

        incorrectEmailOrPasswordErrorMessage().should('contain', 'Las contraseñas no coinciden')
    });
});
