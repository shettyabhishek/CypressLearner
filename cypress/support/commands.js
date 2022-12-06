// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


//Writing the custom command for login
Cypress.Commands.add('login',(email,pwd)=>{
    cy.log("******************* Login Command Triggered ***************");
    cy.get("#Email").type(email);
    cy.get("#Password").type(pwd);
    cy.get(".login-button").click();

    //handling successful and invalid login 
    if(email !== "somemail@test.com" && pwd !== 'password1234'){
        cy.log("Login failed @#@#@#@#@#");
        cy.get(".validation-summary-errors").then(elem => {
            const errorText = elem.text();
            expect(errorText).includes("Login was unsuccessful.");
        })
    }        
    else {
        cy.log("Login success &*&*&*&*&*&*&");
        cy.url().should('include','demo.nopcommerce.com');
    }
})