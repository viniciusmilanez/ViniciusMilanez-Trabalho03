import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import CadastroElements from '../elements/CadastroElements';
import BasePage from './BasePage';

export default class CadastroPage extends BasePage {
  readonly cadastroElements: CadastroElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.cadastroElements = new CadastroElements(page);
  }

  // Função para preencher o formulário de cadastro com dados válidos
  async preencherFormulario(): Promise<void> {
    // Clica no botão para iniciar o cadastro
    await this.cadastroElements.getBotaoNovoCadastro().click();

    // Preenche os campos do formulário com dados gerados
    await this.cadastroElements.getCampoNome().fill(faker.person.firstName());
    await this.cadastroElements.getCampoCpf().fill('33223745050');
    await this.cadastroElements.getCampoEmail().fill('a@b.com.br');
    await this.cadastroElements.getCampoWhatsapp().fill('48 999998888');
    await this.cadastroElements.getCampoCep().fill('88817070');
    
    // Clica no botão para buscar o CEP
    await this.cadastroElements.getBotaoBuscarCep().click();

    // Preenche os campos restantes
    await this.cadastroElements.getCampoNumero().fill('10');
    await this.cadastroElements.getCampoComplemento().fill(faker.word.words());
    
    // Seleciona o método de entrega
    await this.cadastroElements.getCampoMetodoEntrega().click();
    
    // Faz o upload do arquivo da CNH
    await this.cadastroElements
      .getCampoAnexo()
      .setInputFiles('src/support/fixtures/cnh_testes.jpg');
    
    // Clica no botão para enviar o formulário
    await this.cadastroElements.getBotaoCadastrar().click();
  }

  // Função para preencher o formulário de cadastro com dados inválidos (como um e-mail inválido)
  async preencherFormularioInvalido(): Promise<void> {
    // Clica no botão para iniciar o cadastro
    await this.cadastroElements.getBotaoNovoCadastro().click();

    // Preenche os campos com dados válidos, mas faz algo incorreto no email
    await this.cadastroElements.getCampoNome().fill(faker.person.firstName());
    await this.cadastroElements.getCampoCpf().fill('33223745050');
    await this.cadastroElements.getCampoEmail().fill('invalid-email');  // Email inválido
    await this.cadastroElements.getCampoWhatsapp().fill('48 999998888');
    await this.cadastroElements.getCampoCep().fill('88817070');
    
    // Clica no botão para buscar o CEP
    await this.cadastroElements.getBotaoBuscarCep().click();

    // Preenche os campos restantes
    await this.cadastroElements.getCampoNumero().fill('10');
    await this.cadastroElements.getCampoComplemento().fill(faker.word.words());
    
    // Seleciona o método de entrega
    await this.cadastroElements.getCampoMetodoEntrega().click();
    
    // Não vamos fazer upload da CNH em um cadastro inválido
    await this.cadastroElements.getBotaoCadastrar().click();
  }

  // Função para validar o cadastro bem-sucedido (mensagem OK)
  async validarCadastro(): Promise<void> {
    // Verifica se a mensagem de sucesso é visível
    await expect(this.cadastroElements.getMessageOK()).toBeVisible();
  }

  // Função para validar a presença da mensagem solicitando CNH
  async validarCNH(): Promise<void> {
    // Verifica se a mensagem de adicionar CNH é visível
    await expect(this.cadastroElements.getValidarCNH()).toBeVisible();
  }

  // Função para validar o "carrinho" após login e checkout
  async validarCarrinho(): Promise<void> {
    // Realiza o login na aplicação
    await this.page.locator('[data-test="username"]').click();
    await this.page.locator('[data-test="username"]').fill('standard_user');
    await this.page.locator('[data-test="password"]').click();
    await this.page.locator('[data-test="password"]').fill('secret_sauce');
    await this.page.locator('[data-test="login-button"]').click();

    // Navega até o carrinho
    await this.page.locator('#shopping_cart_container a').click();

    // Prossegue com o checkout
    await this.page.locator('[data-test="checkout"]').click();
  }
}
