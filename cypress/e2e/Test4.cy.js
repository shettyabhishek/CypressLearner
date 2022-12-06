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
      cy.get('#LastName').type(registrationData.lastname);
      cy.get("[data-valmsg-for='LastName']").should("have.class","field-validation-valid");
      //cy.get('#Email').type(registrationData.email);
      //cy.get("[data-valmsg-for='Email']").should("have.class","field-validation-error");
      cy.get('#Email').type(registrationData.email);
      cy.get("[data-valmsg-for='Email']").should("have.class","field-validation-valid");
      cy.get('#Newsletter').click().should("not.be.checked");
      cy.get('[name="DateOfBirthDay"]').select(registrationData.dob_day).invoke('val').should("equal",registrationData.dob_day_val);
      cy.get('[name="DateOfBirthMonth"]').select(registrationData.dob_mon).invoke('val').should("equal",registrationData.dob_mon_val);
      cy.get('[name="DateOfBirthYear"]').select(registrationData.dob_year).invoke('val').should("equal",""+registrationData.dob_year_val);
    })
});