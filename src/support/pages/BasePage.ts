import { Page, expect, request } from '@playwright/test';

export default abstract class BasePage {
  constructor(readonly page: Page) {
    this.page = page;
  }

  // Verifica o título da página
  async verifyTitle(title: string): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }

  // Verifica a URL da página
  async verifyUrl(url: string): Promise<void> {
    await expect(this.page).toHaveURL(url);
  }

  /**
   * Método para realizar uma requisição GET
   */
  async getRequest(url: string): Promise<any> {
    const response = await request.get(url);
    return response.json();  // Retorna o JSON da resposta
  }

  /**
   * Método para realizar uma requisição POST
   */
  async postRequest(url: string, data: any): Promise<any> {
    const response = await request.post(url, {
      data: data,
    });
    return response.json();  // Retorna o JSON da resposta
  }

  /**
   * Método para realizar uma requisição PUT
   */
  async putRequest(url: string, data: any): Promise<any> {
    const response = await request.put(url, {
      data: data,
    });
    return response.json();  // Retorna o JSON da resposta
  }

  /**
   * Método para realizar uma requisição DELETE
   */
  async deleteRequest(url: string): Promise<any> {
    const response = await request.delete(url);
    return response.json();  // Retorna o JSON da resposta
  }

  // Outros métodos úteis podem ser adicionados aqui conforme necessidade
}
