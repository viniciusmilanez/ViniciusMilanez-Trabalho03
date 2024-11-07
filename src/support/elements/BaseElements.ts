import { Page, request } from '@playwright/test';

export default abstract class BaseElements {
  constructor(readonly page: Page) {
    this.page = page;
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

  // Aqui você pode adicionar outros métodos para interações com UI
  // Como clicar em botões, preencher campos, etc.
}
