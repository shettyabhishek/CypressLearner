//Automation for the functionalitites of demo.nopcommerce.com
describe('Product Search & add to cart functionality spec', () => {
    it('Suite 1', () => {
      //Visiting the login page 
      cy.visit('https://demo.nopcommerce.com');
      
      //locating the search box, entering the text and clicking on the search button 
      cy.get("#small-searchterms").type('Apple Mac');
      cy.get('#small-search-box-form > .button-1').click();
      //locate the add to cart button and click
      cy.contains("Add to cart").click();
      //the page gets re-directed to product details page, verify the url 
      cy.url().should('include','apple-macbook-pro-13-inch');

      //locate the quantity text box in the products details page 
      cy.get(".product-details-page").find('input[id="product_enteredQuantity_4"]').then(elem=>{
        //type 2 in the text box and click the add to cart button 
        elem.val(""); //clearing any existing text
        cy.wrap(elem).type(2);
        cy.wrap(elem.next()).click();
      })

      //clicking on the shopping cart link and checking the total 
      cy.get("a[href='/cart'][class='ico-cart']").click();
      cy.url().should("include","cart");

      cy.wait(3000);
      //get the quantity and calculate the total
      cy.get("table.cart tbody tr").then(row=>{
        expect(row.length).equals(1);

        //get the column contents - price, quantity and total cost
        const firstRow = row.eq(0);
        const price = firstRow.find("td.unit-price .product-unit-price").text().replace("$","").replace(",","").trim();
        const quantity = parseInt(firstRow.find("td.quantity input[type='text']").val());
        const total = firstRow.find("td.subtotal .product-subtotal").text().replace("$","").replace(",","").trim();
        expect(price*quantity).equals(parseInt(total))
      })
    })
  })