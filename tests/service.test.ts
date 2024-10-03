import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { Service } from '../models/service.model';
import { SimpleReporter } from '../simple-reporter';

describe('Service API', () => {
  const baseUrl = 'https://api-desafio-qa.onrender.com';
  const p = pactum;
  const rep = SimpleReporter;

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  it('POST /company/{companyId}/services - Criar novo serviço', async () => {
    const companyId = 1;
    const newService: Service = {
      serviceName: "Consultoria de TI",
      serviceDescription: "Serviço especializado em TI."
    };

    const response = await p.spec()
      .post(`${baseUrl}/company/${companyId}/services`)
      .withBody(newService)
      .expectStatus(StatusCodes.CREATED);

    console.log(response.body);
  });

  it('PUT /company/{companyId}/services/{serviceId} - Atualizar serviço', async () => {
    const companyId = 1;
    const serviceId = 301;
    const updatedService: Service = {
      serviceName: "Atualização de Software",
      serviceDescription: "Serviço atualizado para incluir novos recursos."
    };

    const response = await p.spec()
      .put(`${baseUrl}/company/${companyId}/services/${serviceId}`)
      .withBody(updatedService)
      .expectStatus(StatusCodes.OK);

    console.log(response.body);
  });
});