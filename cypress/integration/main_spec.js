describe('Main page', () => {
  const keyword = 'Nevermind';

  beforeEach(function() {
    cy.visit('/');
    cy.get('input[placeholder="Find Album"]')
      .as('input')
      .clear();
    cy.get('[data-testid="submit"]').as('submit');
    cy.server({ force404: true });

    cy.route(
      'GET',
      `http://musicbrainz.org/ws/2/release-group?query=${keyword}&fmt=json`,
      'fixture:search/nevermind.json'
    );
    cy.route(
      'GET',
      'http://coverartarchive.org/release/eea965ac-4a58-4e16-87b4-6a0f5001bbda',
      'fixture:search/eea965ac-4a58-4e16-87b4-6a0f5001bbda.json'
    );
    cy.route(
      'GET',
      'http://coverartarchive.org/release/2dc16a5c-56c5-411c-af1f-9710dacc90d7',
      'fixture:search/2dc16a5c-56c5-411c-af1f-9710dacc90d7.json'
    );
    cy.route(
      'GET',
      'http://coverartarchive.org/release/eea965ac-4a58-4e16-87b4-6a0f5001bbda/20393400791-500.jpg',
      'fixture:search/mbid-891b716b-e52a-422b-bef3-53c419776601-11944397489_thumb500.jpg'
    );
    cy.route(
      'GET',
      'http://coverartarchive.org/release/2dc16a5c-56c5-411c-af1f-9710dacc90d7/20236078030-500.jpg',
      'fixture:search/mbid-891b716b-e52a-422b-bef3-53c419776601-11944397489_thumb500.jpg'
    );
  });

  it('Should display only a search form if url does not contain a search query', () => {
    cy.location('pathname').should('equal', '/search');
    cy.get('[data-testid="albums"]').should('not.to.exist');
    cy.get('@input').should('be.visible');
    cy.get('@input').should('have.value', '');
  });

  it('Should be able to perform a search by filling out and submit a form', () => {
    cy.location('pathname').should('equal', '/search');

    cy.get('[data-testid="albums"]').should('not.to.exist');
    cy.get('@input')
      .type(keyword)
      .should('have.value', keyword);

    cy.get('@submit').click();
    cy.location('pathname').should('equal', '/search');
    cy.location('search').should('equal', '?q=Nevermind');
    cy.get('[data-testid="album"]').should('have.length', 4);
  });

  it('Should perform a search instantly and display results if the url contains a search query', () => {
    cy.visit('/search?q=Nevermind');

    cy.location('pathname').should('equal', '/search');
    cy.location('search').should('equal', '?q=Nevermind');
    cy.get('@input').should('have.value', keyword);

    cy.get('[data-testid="album"]').should('have.length', 3);
  });
});
