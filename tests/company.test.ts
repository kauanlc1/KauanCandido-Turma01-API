import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { Company } from '../models/company.model';
import { SimpleReporter } from '../simple-reporter';
import { faker } from '@faker-js/faker';

describe('Company API', () => {
  const baseUrl = 'https://api-desafio-qa.onrender.com';
  const p = pactum;
  const rep = SimpleReporter;

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  it('POST /company - Criar nova empresa', async () => {
    const newCompany: Company = {
      name: faker.company.name(),
      cnpj: "00456865000167",
      state: "SP",
      city: "São Paulo",
      address: "Av. Paulista, 1000",
      sector: "Tecnologia"
    };
  
    await p.spec()
        .post(`${baseUrl}/company`)
        .withBody(newCompany)
        .expectStatus(StatusCodes.CREATED)
  });
  
  it('GET /company - Listar todas as empresas', async () => {
    const response = await p.spec()
      .get(`${baseUrl}/company`)
      .expectStatus(StatusCodes.OK);

    console.log(response.body);
  });

  it('GET /company/{companyId} - Obter detalhes de uma empresa', async () => {
    const companyId = 1;
    const response = await p.spec()
      .get(`${baseUrl}/company/${companyId}`)
      .expectStatus(StatusCodes.OK);

    console.log(response.body);
  });

  it('PUT /company/{companyId} - Atualizar uma empresa', async () => {
    const companyId = 1;
    const updatedCompany: Company = {
      name: "Tech Corp Atualizada",
      cnpj: "12.345.678/0001-99",
      state: "RJ",
      city: "Rio de Janeiro",
      address: "Rua das Laranjeiras, 500",
      sector: "Tecnologia"
    };

    const response = await p.spec()
      .put(`${baseUrl}/company/${companyId}`)
      .withBody(updatedCompany)
      .expectStatus(StatusCodes.OK);

    console.log(response.body);
  });

  it('DELETE /company/{companyId} - Deletar uma empresa', async () => {
    const companyId = 1;
    const response = await p.spec()
      .delete(`${baseUrl}/company/${companyId}`)
      .expectStatus(StatusCodes.OK);

    console.log(response.body);
  });
});