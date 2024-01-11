import request from 'supertest';

const uri = 'https://petstore.swagger.io/v2';

it('POST /pet (empty)', async () => {
  const resp = await request(uri)
    .post('/pet')
    .send({})
    .set('accept', 'application/json');
  expect(resp.status).toBe(405);
  // it should be 405 according to swagger, but the API returns 415, so this test fails
});

it('POST /pet', async () => {
  const id = Math.floor(Math.random() * 1000000);
  const name = `test-${id}`;

  const resp = await request(uri)
    .post('/pet')
    .send({ id, name, status: 'available' })
    .set('accept', 'application/json');
  expect(resp.status).toBe(200);
  expect(resp.body.name).toBe(name);
});

describe('basic functionalities of /pet API', () => {
  let id = Math.floor(Math.random() * 1000000);
  let name = `test-${id}`;

  beforeEach(async () => {
    id = Math.floor(Math.random() * 1000000);
    name = `test-${id}`;

    const resp = await request(uri)
      .post('/pet')
      .send({ id, name, status: 'available' })
      .set('accept', 'application/json');
    expect(resp.status).toBe(200);
  });

  it('GET /pet/${id}', async () => {
    const resp = await request(uri)
      .get(`/pet/${id}`)
      .set('accept', 'application/json');
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe(name);
  });

  it('GET /pet/findByStatus', async () => {
    const resp = await request(uri)
      .get('/pet/findByStatus?status=available')
      .set('accept', 'application/json');
    expect(resp.status).toBe(200);
    expect((resp.body as any[]).find((pet) => pet.id === id)).toBeTruthy();
  });

  it('GET /pet/findByStatus (negative scenario)', async () => {
    const resp = await request(uri)
      .get('/pet/findByStatus?status=sold')
      .set('accept', 'application/json');
    expect(resp.status).toBe(200);
    expect((resp.body as any[]).find((pet) => pet.id === id)).toBeFalsy();
  });

  it('PUT /pet', async () => {
    const updatedName = `test-${id}-2`;

    const resp = await request(uri)
      .put('/pet')
      .send({ id, name: updatedName })
      .set('accept', 'application/json');
    expect(resp.status).toBe(200);

    const resp2 = await request(uri)
      .get(`/pet/${id}`)
      .set('accept', 'application/json');
    expect(resp2.status).toBe(200);
    expect(resp2.body.name).toBe(updatedName);
  });

  it('POST /pet/{petId}', async () => {
    const updatedName = `test-${id}-2`;

    const resp = await request(uri)
      .post(`/pet/${id}`)
      .type('form')
      .send({ name: updatedName })
      .set('accept', 'application/json');
    expect(resp.status).toBe(200);

    const resp2 = await request(uri)
      .get(`/pet/${id}`)
      .set('accept', 'application/json');
    expect(resp2.status).toBe(200);
    expect(resp2.body.name).toBe(updatedName);
  });

  it('DELETE /pet/{petId}', async () => {
    const resp = await request(uri)
      .delete(`/pet/${id}`)
      .set('accept', 'application/json');
    expect(resp.status).toBe(200);

    const resp2 = await request(uri)
      .get(`/pet/${id}`)
      .set('accept', 'application/json');
    expect(resp2.status).toBe(404);
  });
});
