// Cypress.Commands.add('submitForm', () => {
//     cy.get('#firstName').type('Victor')
//     cy.get('#lastName').type('Charao')
//     cy.get('#email').type('victor.charao@hotmail,com')
//     cy.get('#phone').type('51994200884')
//     cy.get('#open-text-area').type('blablabla')
//     cy.get('button[type=submit]').click()
// })
Cypress.Commands.add('submitForm', (data = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '987654321',
    text: 'Thank you!'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#phone').type(data.phone)
    cy.get('#open-text-area').type(data.text)
    cy.get('button[type=submit]').click()
})