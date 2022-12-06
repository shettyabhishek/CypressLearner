//Automation for the functionalitites of demo.nopcommerce.com
describe('Data driven functionality spec', () => {
    let registrationData = null;
    beforeEach(()=>{
        //writing a fixture to get data from a json file
        cy.fixture("registration").then((response)=>{
            registrationData = response
        })
    })

    it('Suite 1', () => {
      //Visiting the login page 
      cy.visit('https://demo.nopcommerce.com/login?returnUrl=%2F');
      cy.get('.new-wrapper > .buttons > .button-1').click();
      cy.url().should('include',"register?");
      cy.get(".page-title h1").should("have.text","Register");

      //check the gender
      cy.get('#gender-male').check().should("be.checked").and("have.value","M");

      //adding the text to the fields and validating
      cy.get('#FirstName').type(registrationData.firstname);
      cy.get("[data-valmsg-for='FirstName']").should("have.class","field-validation-valid");
      cy.get('#LastName').type("User");
      cy.get("[data-valmsg-for='LastName']").should("have.class","field-validation-valid");
      cy.get('#Email').type("somemail");
      cy.get("[data-valmsg-for='Email']").should("have.class","field-validation-error");
      cy.get('#Email').type("somemail@test.com");
      cy.get("[data-valmsg-for='Email']").should("have.class","field-validation-valid");
      cy.get('#Newsletter').click().should("not.be.checked");
      cy.get('[name="DateOfBirthDay"]').select(2).invoke('val').should("equal","2");
      cy.get('[name="DateOfBirthMonth"]').select("August").invoke('val').should("equal","8");
      cy.get('[name="DateOfBirthYear"]').select("1990").invoke('val').should("equal","1990");
      cy.get("#Password").type("passoword1234");
      cy.get("#ConfirmPassword").type("passoword1234");
      cy.get("[data-valmsg-for='Password']").should("have.class","field-validation-valid");
      cy.get("[data-valmsg-for='ConfirmPassword']").should("have.class","field-validation-valid");
    })
});