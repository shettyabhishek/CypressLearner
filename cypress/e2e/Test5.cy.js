//Automation for the functionalitites of demo.nopcommerce.com
describe('XHR testing with cypress spec', () => {
    let mockData = null;
    beforeEach(()=>{
        cy.server();        
        //calling the fixture to get the mock data 
        cy.fixture("mock_data").then((resp)=>{
            mockData = resp;
        })
    });

    //http interception 
    it("http interception with serve & route methods (deprecated)",()=>{
        //Visiting the login page 
        cy.visit('https://demo.nopcommerce.com/');
        //locating the search box and entering the text
        cy.get("#small-searchterms").type("laptop");
        cy.get("#small-search-box-form > .button-1").click();
        cy.route("/searchtermautocomplete").then((xhr)=>{
            cy.log(JSON.stringify(xhr));
            expect(xhr.status).to.equal(200);
        });
    })

    /**it("http interception with intercept method",()=>{
        //Visiting the login page 
        cy.visit('https://demo.nopcommerce.com/');
        //locating the search box and entering the text
        cy.get("#small-searchterms").type("laptop");
        cy.get("#small-search-box-form > .button-1").click();
        cy.intercept("/searchtermautocomplete").as("srchAutoComplete");
        cy.wait("@srchAutoComplete").its("status").should("be.eq",200);
    });**/


    //test case to show the mocking of data - stubbing 
    it("Stubbing ",()=>{
        cy.visit('https://demo.nopcommerce.com/');
        //locating the search box and entering the text
        cy.get("#small-searchterms").type("laptop");
        cy.get("#small-search-box-form > .button-1").click();
        cy.route({
            url: "/searchtermautocomplete",
            method: "GET",
            response: mockData
        }).then((xhr)=>{
            cy.log(JSON.stringify(xhr));
            expect(xhr.status).to.equal(200);
        });
    })

}); 