import { Page, expect, request } from '@playwright/test';
import { faker } from '@faker-js/faker';
import BasePage from './BasePage';

export default class CadastroPage extends BasePage {
  constructor(readonly page: Page) {
    super(page);
  }

  // Função para realizar o cadastro via API
  async cadastrarUsuario(): Promise<void> {
    const nome = faker.person.firstName();
    const email = 'a@b.com.br'; // Usando um e-mail fixo para simplificar
    const telefone = '48 999998888';
    const cpf = '33223745050';
    const cep = '88817070';
    const numero = '10';
    const complemento = faker.word.words();

    // Realizando a requisição POST para criar o usuário
    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
      data: {
        name: nome,
        email: email,
        phone: telefone,
        cpf: cpf,
        address: {
          street: 'Rua Exemplo',
          suite: complemento,
          city: 'Cidade Teste',
          zipcode: cep,
          number: numero
        }
      }
    });

    // Verificando se a requisição foi bem-sucedida
    expect(response.status()).toBe(201);

    // Verificando se o nome e email retornados são os mesmos
    const responseBody = await response.json();
    expect(responseBody.name).toBe(nome);
    expect(responseBody.email).toBe(email);
  }

  // Função para cadastrar um usuário com dados incompletos (sem telefone)
  async cadastrarUsuarioSemTelefone(): Promise<void> {
    const nome = faker.person.firstName();
    const email = 'a@b.com.br'; // Usando um e-mail fixo para simplificar
    const cpf = '33223745050';
    const cep = '88817070';
    const numero = '10';
    const complemento = faker.word.words();

    // Realizando a requisição POST para criar o usuário, mas sem telefone
    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
      data: {
        name: nome,
        email: email,
        phone: '',  // Telefone ausente
        cpf: cpf,
        address: {
          street: 'Rua Exemplo',
          suite: complemento,
          city: 'Cidade Teste',
          zipcode: cep,
          number: numero
        }
      }
    });

    // Esperando um erro na requisição, por exemplo, status 400
    expect(response.status()).toBe(400);
  }

  // Função para cadastrar um usuário com e-mail já existente
  async cadastrarUsuarioComEmailExistente(): Promise<void> {
    const nome = faker.person.firstName();
    const email = 'a@b.com.br'; // Usando um e-mail fixo para simplificar (já existe)
    const telefone = '48 999998888';
    const cpf = '33223745050';
    const cep = '88817070';
    const numero = '10';
    const complemento = faker.word.words();

    // Realizando a requisição POST para criar o usuário com um email já existente
    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
      data: {
        name: nome,
        email: email,  // E-mail repetido
        phone: telefone,
        cpf: cpf,
        address: {
          street: 'Rua Exemplo',
          suite: complemento,
          city: 'Cidade Teste',
          zipcode: cep,
          number: numero
        }
      }
    });

    // Esperando que o servidor retorne erro devido ao e-mail duplicado
    expect(response.status()).toBe(400);
  }

  // Função para cadastrar um usuário com CPF inválido
  async cadastrarUsuarioComCpfInvalido(): Promise<void> {
    const nome = faker.person.firstName();
    const email = 'a@b.com.br';
    const telefone = '48 999998888';
    const cpf = '00000000000';  // CPF inválido
    const cep = '88817070';
    const numero = '10';
    const complemento = faker.word.words();

    // Realizando a requisição POST para criar o usuário com um CPF inválido
    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
      data: {
        name: nome,
        email: email,
        phone: telefone,
        cpf: cpf,  // CPF inválido
        address: {
          street: 'Rua Exemplo',
          suite: complemento,
          city: 'Cidade Teste',
          zipcode: cep,
          number: numero
        }
      }
    });

    // Esperando um erro na requisição, por exemplo, status 400
    expect(response.status()).toBe(400);
  }

  // Função para cadastrar um usuário sem preencher campos obrigatórios
  async cadastrarUsuarioSemCamposObrigatorios(): Promise<void> {
    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
      data: {
        name: '',  // Nome vazio (campo obrigatório)
        email: '',  // E-mail vazio (campo obrigatório)
        phone: '',  // Telefone vazio
        cpf: '',  // CPF vazio
        address: {
          street: '',  // Endereço vazio
          suite: '',
          city: '',
          zipcode: '',  // CEP vazio
          number: ''
        }
      }
    });

    // Esperando que o servidor retorne erro devido à falta de dados obrigatórios
    expect(response.status()).toBe(400);
  }

  // Função para cadastrar um usuário com endereço inválido (CEP não encontrado)
  async cadastrarUsuarioComCepInvalido(): Promise<void> {
    const nome = faker.person.firstName();
    const email = 'a@b.com.br';
    const telefone = '48 999998888';
    const cpf = '33223745050';
    const cep = '00000000';  // CEP inválido
    const numero = '10';
    const complemento = faker.word.words();

    // Realizando a requisição POST para criar o usuário com um CEP inválido
    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
      data: {
        name: nome,
        email: email,
        phone: telefone,
        cpf: cpf,
        address: {
          street: 'Rua Exemplo',
          suite: complemento,
          city: 'Cidade Teste',
          zipcode: cep,  // CEP inválido
          number: numero
        }
      }
    });

    // Esperando um erro na requisição, por exemplo, status 400
    expect(response.status()).toBe(400);
  }

  // Função para simular uma operação que seria a parte do "carrinho" (exemplo de requisição)
  async validarCarrinho(): Promise<void> {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.length).toBeGreaterThan(0);  // Verifica se existe algum post (exemplo de operação com "carrinho")
  }
}
