//Automation for the functionalitites of demo.nopcommerce.com
///<reference types="cypress">
describe('Login functionality with custom command spec', () => {
  it('Custom commands testing', () => {
    //Visiting the login page 
    cy.visit('https://demo.nopcommerce.com/login?returnUrl=%2F');
    //Failed login scenario
    cy.login("somemailTest@test.com","pass1234");
    //Passed login
    cy.login("somemail@test.com","password1234");
  })
})