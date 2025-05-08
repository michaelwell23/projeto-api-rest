import { expect, beforeAll, afterAll, describe, it } from 'vitest';
import request from 'supertest';

import app from '../src/app';

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should be able to creante a new transaction', async () => {
    const response = await request(app.server).post('/transactions').send({
      title: 'New Transaction',
      amount: 50000,
      type: 'credit',
    });

    expect(response.statusCode).toEqual(201);
  });
});
