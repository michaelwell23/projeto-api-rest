import fastify from 'fastify';

const app = fastify();

app.get('/', async () => {
  return 'Palmeiras não tem mundial';
});

app.listen({ port: 3000 }).then(() => {
  console.log('Server is running at http://localhost:3000');
});
