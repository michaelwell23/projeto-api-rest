import { expect, beforeAll, afterAll, describe, it, beforeEach } from 'vitest';
import request from 'supertest';

import app from '../src/app';
import { execSync } from 'child_process';

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all');
    execSync('npm run knex migrate:latest');
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
      .set('Cookie', cookies || [])
      .expect(200);

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New Transaction',
        amount: 50000,
      }),
    ]);
  });

  it('Should be able to get a specific transaction', async () => {
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
      .set('Cookie', cookies || [])
      .expect(200);

    const transactionId = listTransactionsResponse.body.transactions[0].id;

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies || [])
      .expect(200);

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New Transaction',
        amount: 50000,
      })
    );
  });

  it('Should be able to get a summary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 50000,
        type: 'credit',
      });

    const cookies = createTransactionResponse.get('Set-Cookie');

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies || [])
      .send({
        title: 'New Transaction',
        amount: 20000,
        type: 'debit',
      });

    const summaryResponse = await request(app.server)
      .get(`/transactions/summary`)
      .set('Cookie', cookies || [])
      .expect(200);

    expect(summaryResponse.body.summary).toEqual({
      amount: 30000,
    });
  });
});
