describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Victor')
    cy.get('#lastName').type('Charao')
    cy.get('#email').type('victor.charao@hotmail.com')
    cy.get('#phone').type('51994200884')
    cy.get('#open-text-area').type('blablabla')
    // cy.get('button[type=submit]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter formulário com email inválido', () => {
    cy.get('#firstName').type('Victor')
    cy.get('#lastName').type('Charao')
    cy.get('#email').type('victor.charao@hotmail,com')
    cy.get('#phone').type('51994200884')
    cy.get('#open-text-area').type('blablabla')
    cy.get('button[type=submit]').click()

    cy.get('.error').should('be.visible')
  })

  it('Campo telefone não deve aceitar valores não-numéricos', () => {
    cy.get('#phone')
      .type('abcdef')
      .should('have.value', '')
  })

  it('Submete formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type=submit]').click()

    cy.get('.error').should('be.visible')
  })

  it.skip('Submete formulário usando comandos customizados', () => {
    const data = {
      firstName: 'Victor',
      lastName: 'Charao',
      email: 'victor.charao@hotmail.com',
      phone: '551994200884',
      text: 'Obrigado!'
    }
    cy.submitForm(data.firstName, data.lastName, data.email, data.phone, data.text)

    cy.get('.success').should('be.visible')
  })

  it('Select', () => {
    cy.get('#product')
      .select('YouTube')
      // .select(1) // seleciona usando índice
      .should('have.value', 'youtube')
  })

  it('Radio', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('Marca todos os radios', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('Marca as duas checkboxes e desmarca a última', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('Seleciona um arquivo da pasta fixtures para upload', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('Seleciona um arquivo simulando um drag and drop', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('Seleciona um arquivo da pasta fixtures para upload com um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
    .selectFile('@sampleFile')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('Verifica que a politica de privacidade abre uma nova aba sem clicar', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('Acessa a página de política de privacidade removendo o target e clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')  
  })
})