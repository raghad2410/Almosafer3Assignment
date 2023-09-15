/// <reference types="Cypress" />

describe('Almosafer Hotel Search', () => {
  it('should perform a hotel search and sort by lowest price', () => {
    // Visit the Almosafer website
    cy.visit('https://www.almosafer.com/en');

    // Click the "Saudi Arabia" button
    cy.get('.cta__saudi').click();

    // Click the "Hotels" tab
    cy.get('#uncontrolled-tab-example-tab-hotels').click();

    // Define an array of city strings
    const cities = ['dubai', 'jeddah', 'amman'];

    // Select a random city from the array
    const randomIndex = Math.floor(Math.random() * cities.length);
    const randomCity = cities[randomIndex];

    // Type the randomly selected city into the search input
    cy.get('[data-testid="AutoCompleteInput"]').type(randomCity);

    // Click the search button
    cy.get('[data-testid="HotelSearchBox__SearchButton"]').click();

    cy.wait(60000)
    // cy.contains('properties found in').should('be.visible').then(($element) => {
    //   if ($element.length > 0) {
        cy.get('[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]').click();
    //   }
    // });
    cy.wait(20000)
    
    cy.get('[data-testid="HotelSearchResult__Hotel0__PriceLabel"] > .Price__Value').then((elements) => {
      // Extract numbers from the elements and store them in an array
      const numbers = elements.toArray().map((element) => {
        const text = element.innerText;
        // Extract numbers from the element's text (assuming the text contains only numbers)
        return parseInt(text, 10);
      });

      // Compare numbers in pairs (e.g., 2nd > 1st, 4th > 3rd, 6th > 5th, and so on)
      cy.wrap(numbers).each((number, index) => {
        if (index % 2 === 1 && index < numbers.length - 1) {
          cy.wrap(numbers[index + 1]).should('be.greaterThan', number);
        }
      });
      
    });

  });
});
