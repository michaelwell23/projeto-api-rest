import { describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Nearby Gyms (e2e)', () => {
  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym 1',
        description: 'Description for Gym 1',
        phone: '123456789',
        latitude: -23.55052,
        longitude: -46.633308,
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym 2',
        description: 'Description for Gym 2',
        phone: '987654321',
        latitude: -23.55152,
        longitude: -46.634308,
      });

    const response = await request(app.server)
      .get('/gyms/nearby')
      .set('Authorization', `Bearer ${token}`)
      .query({
        latitude: -23.55052,
        longitude: -46.633308,
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(2);
  });
});
