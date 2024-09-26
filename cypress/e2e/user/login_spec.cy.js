import { LoginPage } from "../pages/login_page";

const loginPage = new LoginPage();

describe('/login', () => {
    beforeEach(() => {
        cy.visit('https://conduit.realworld.how/login');
    })

    it('greets with Sign in', () => {
        cy.contains('h1', 'Sign in');
    });

    it('links to /register', () => {
        cy
        .contains('Need an account?')
        .should('have.attr', 'href', '/register')
    });

    it('prevents us from clicking Sign in until both inputs are filled', () => {
        cy.get('form').contains('Sign in')
            .should('be.disabled');

        // cy.get(':nth-child(2) > .form-control')
        //     .type('asdf');
        loginPage.submitEmail('asdf');
        // cy.get(':nth-child(3) > .form-control')
        //     .type('asdf');
        loginPage.submitPassword('asdf');
        

        cy.get('form').contains('Sign in')
            .should('not.be.disabled');
    });

    it('requires valid email and password', () => {
        // cy.get(':nth-child(2) > .form-control')
        //     .type('testuser9524');
        // cy.get(':nth-child(3) > .form-control')
        //     .type('invalid {enter}');

        cy.fixture('users').then((users) => {
            loginPage.submitEmail(users.email);
            loginPage.submitPassword('invalid');
            loginPage.clickSubmit();
        });

        cy.get('.error-messages > li')
            .should('contain', 'email or password is invalid');
    });

    it('navigates to homepage on successful login', () => {
        // cy.get(':nth-child(2) > .form-control')
        //     .type('davidho6308493@gmail.com');
        // cy.get(':nth-child(3) > .form-control')
        //     .type('testuser {enter}');

        // 
        /**
         * Replaced the above code with our own login command,
         * so that if the login changes, we can just edit the
         * login command found in /support/commands.js instead
         * of having to edit it in all test files
         */
        //cy.login('davidho6308493@gmail.com', 'testuser');

        /**
         * Replaced the above code again with our own
         * loginPage class in /pages/login_page.js
         * that has methods for submitting 
         * email, password
         * Also using fixtures to supply data
         */
        
        cy.fixture('users').then((users) => {
            loginPage.submitEmail(users.email);
            loginPage.submitPassword(users.password);
            loginPage.clickSubmit();
        });

        // test that we go to homepage
        cy.hash().should('eq', '');
    })
})