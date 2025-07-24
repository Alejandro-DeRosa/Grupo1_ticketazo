import 'cypress-xpath';

describe('Login - Test Cases', () => {

  const emailInput = () => cy.get('[data-cy="input-email"]');
  const passwordInput = () => cy.get('[data-cy="input-password"]');
  const loginButton = () => cy.get('[data-cy="btn-login"]');
  const emailErrorMessage = () => cy.xpath('/html/body/div/div/main/div/div/div/div/div/div[2]/div[2]/div[1]/div[2]');
  const passwordErrorMessage = () => cy.xpath('/html/body/div/div/main/div/div/div/div/div/div[2]/div[2]/div[2]/div[2]');
  const incorrectEmailOrPasswordErrorMessage = () => cy.get('[data-cy="error-message"]');
  const navMenu = () => cy.xpath('/html/body/div/div/nav/header/ul[1]/ul');

  beforeEach(function () {
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/login');
    cy.fixture('loginUsers').then((users) => {
      this.users = users;
    });
  });

  it('TC01 - Login exitoso con credenciales válidas', function () {
    emailInput().type(this.users.validUser.email);
    passwordInput().type(this.users.validUser.password);
    loginButton().click();

    cy.wait(1000);

    navMenu().should('contain.text', 'Mis entradas');
  });

  it('TC02 - Login con campos vacíos', () => {
    loginButton().click();

    emailErrorMessage().should('contain.text', 'Rellene este campo.');
    passwordErrorMessage().should('contain.text', 'Rellene este campo.');
  });

  it('TC03 - Login con email no registrado', function () {
    emailInput().type(this.users.unregisteredUser.email);
    passwordInput().type(this.users.unregisteredUser.password);
    loginButton().click();

    incorrectEmailOrPasswordErrorMessage().should('contain', 'Correo o contraseña incorrectos');
  });

  it('TC04 - Login con contraseña incorrecta', function () {
    emailInput().type(this.users.wrongPassword.email);
    passwordInput().type(this.users.wrongPassword.password);
    loginButton().click();

    incorrectEmailOrPasswordErrorMessage().should('contain', 'Correo o contraseña incorrectos');
  });

  it('TC05 - Login con formato de email inválido', function () {
    emailInput().type(this.users.invalidEmailFormat.email);
    passwordInput().type(this.users.invalidEmailFormat.password);
    loginButton().click();

    incorrectEmailOrPasswordErrorMessage().should('contain', 'Correo o contraseña incorrectos');
    emailErrorMessage().should('contain.text', 'Incluye un signo "@" en la dirección de correo electrónico. La dirección "admin.com" no incluye el signo "@"');

  });

  afterEach(() => {
    cy.clearCookies();
  });

});
