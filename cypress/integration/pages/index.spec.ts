// Sh**t! I Smoke
// Copyright (C) 2018-2020  Marcelo S. Coelho, Amaury Martiny

// Sh**t! I Smoke is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Sh**t! I Smoke is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Sh**t! I Smoke.  If not, see <http://www.gnu.org/licenses/>.

describe('Homepage', () => {
	it('h1 is visible', () => {
		cy.visit('/');

		cy.get('h1').should('be.visible').should('contain', 'How much am I');
	});

	it('footer is visible', () => {
		cy.visit('/');

		cy.get('footer')
			.should('be.visible')
			.find('a[href="/faq"]')
			.should('have.attr', 'href', '/faq')
			.click();

		cy.url().should('contain', 'faq');
	});

	it('can click on a city', () => {
		cy.visit('/');

		cy.get('.pt-2').find('a').first().click();

		cy.url().should('match', /city\/\w+/);
	});

});
