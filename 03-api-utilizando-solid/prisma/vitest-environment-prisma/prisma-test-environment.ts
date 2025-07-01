import { Environment } from 'vitest';

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('Setup Prisma test environment');

    return {
      async teardown() {
        console.log('Teardown Prisma test environment');
      },
    };
  },
};
