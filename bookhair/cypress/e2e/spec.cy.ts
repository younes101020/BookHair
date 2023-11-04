describe('Authentication', () => {
  it('login', () => {
    cy.visit('http://localhost:3000')

    cy.get('[data-test="login"]').click()
    cy.get('[data-test="email"]').type('asszd@gmail.com')
    cy.get('[data-test="mot_de_passe"]').type('Azerty-02')
    cy.get('[data-test="submit"]').click()
    cy.wait(5000)

    cy.reload()

    cy.contains('Sign out').should('be.visible')
    cy.get('[data-test="backhome"]').click()
    cy.wait(3000)
    cy.get('[data-test="signout"]').click()
  })

  it('register', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-test="register"]').click()

    cy.get('[data-test="nom"]').type('Dohny')
    cy.get('[data-test="prenom"]').type('Johny')
    cy.get('[data-test="email"]').type('jdmmm@gmail.com')
    cy.get('[data-test="mot_de_passe"]').type('Azerty-03')
    cy.get('[data-test="confirm"]').type('Azerty-03')
    cy.get('[data-test="telephone"]').type('0760589835')
    cy.get('[data-test="client"]').click()
    cy.get('[data-test="submit"]').click()
  })
})