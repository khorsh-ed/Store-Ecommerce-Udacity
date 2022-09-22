import app from '../index';
import supertest from 'supertest';
const request = supertest(app);

describe('Testing the images endpoint', () => {

  it('Calling images endpoint without name paramater should returns 400', async () => {
    await request.get('/api/images').expect(400);
  });

  it('Calling images endpoint without width paramater should returns 400', async () => {
    await request.get('/api/images?name=fjord').expect(400);
  });

  it('Calling images endpoint without height paramater should returns 400', async () => {
    await request.get('/api/images?name=fjord&width=300').expect(400);
  });

  it('Calling images endpoint without providing height paramaters with correct value should returns 400', async () => {
    await request.get('/api/images?name=fjord&width=300&height=30-').expect(400);
  });

  it('Calling images endpoint without providing width paramaters with correct value should returns 400', async () => {
    await request.get('/api/images?name=fjrd&width=30-0&height=30').expect(400);
  });

  it('Calling images endpoint with width paramaters bigger than 999 should returns 400', async () => {
    await request.get('/api/images?name=fjord&width=999999&height=30').expect(400);
  });

  it('Calling images endpoint with width paramaters smaller than 1 should returns 400', async () => {
    await request.get('/api/images?name=fjord&width=0&height=30').expect(400);
  });

  it('Calling images endpoint with height paramaters bigger than 999 should returns 400', async () => {
    await request.get('/api/images?name=fjord&width=99&height=9990').expect(400);
  });

  it('Calling images endpoint with height paramaters smaller than 1 should returns 400', async () => {
    await request.get('/api/images?name=fjord&width=99&height=0').expect(400);
  });

  it('Calling images endpoint without providing existing name should returns 400', async () => {
    await request.get('/api/images?name=jushdsrd&width=300&height=300').expect(404);
  });

  it('Calling images endpoint with correct paramater values should returns 200', async () => {
    await request.get('/api/images?name=fjord&width=300&height=300').expect(200);
  });
});