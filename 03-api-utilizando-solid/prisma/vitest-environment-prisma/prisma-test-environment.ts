import { Environment } from 'vitest';

export default <Environment>(<unknown>{
  name: 'prisma',
  async setup() {
    console.log('Setup Prisma test environment');
  },

  async teardown() {
    console.log('Teardown Prisma test environment');
  },
});
