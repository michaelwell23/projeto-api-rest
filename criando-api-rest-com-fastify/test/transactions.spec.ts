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
    const response = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 50000,
        type: 'credit',
      })
      .expect(201);
  });

  it('Should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 50000,
        type: 'credit',
      });

    const cookies = createTransactionResponse.get('Set-Cookie');

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200);

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New Transaction',
        amount: 50000,
      }),
    ]);
  });
});
