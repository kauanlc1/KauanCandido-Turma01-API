import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { Employee } from '../models/employee.model';
import { SimpleReporter } from '../simple-reporter';

describe('Employee API', () => {
  const baseUrl = 'https://api-desafio-qa.onrender.com';
  const p = pactum;
  const rep = SimpleReporter;

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  it('PUT /company/{companyId}/employees/{employeeId} - Atualizar funcionário', async () => {
    const companyId = 1;
    const employeeId = 501;
    const updatedEmployee: Employee = {
      name: "João Silva",
      position: "Gerente",
      email: "joao.silva@example.com"
    };

    const response = await p.spec()
      .put(`${baseUrl}/company/${companyId}/employees/${employeeId}`)
      .withBody(updatedEmployee)
      .expectStatus(StatusCodes.OK);

    console.log(response.body);
  });
});