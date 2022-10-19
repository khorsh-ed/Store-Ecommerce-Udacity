import supertest from 'supertest';
import app from '../../index';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import client from '../../database'
const request = supertest(app);

describe('Testing Prouct EndPoint', () => {
    
  const product = {
      name: 'apple',
      price:12
    } as unknown as Product;

  const user = {
        email: 'ahmam@google.com',
        password: 'pass',
        first_name: 'abdallah',
        last_name: 'abdelkader'
      } as User;

  let productId: number;
  let userApi:String = '/api/users';
  let Api:String = '/api/products';
  let token:String;

  beforeAll(async () => {

    await request
      .post(`${userApi}/`)
      .send(user)
      .expect(200)
      .then((res) => {
        token = JSON.parse(res.text).token;
      });
  });

  afterAll(async () => {
    const connection = await client.connect()
    const Usersql = 'DELETE FROM users;'
    await connection.query(Usersql);
    connection.release();
  })



  it('Testing the create endpoint with valid token', async () => {
    await request
      .post(`${Api}/`)
      .send({...product})
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        productId = JSON.parse(res.text).data.id;
      });
  });

  it('Testing the create endpoint with invalid token', async () => {
    await request
      .post(`${Api}/`)
      .send({...product})
      .set('Authorization', `Bearer kjlhskjshks`)
      .expect(401);
  });

  it('Testing the getall endpoint with valid token', async () => {
    await request
      .get(`${Api}/`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Testing the getall endpoint with invalid token', async () => {
    await request
      .get(`${Api}/`)
      .set('Authorization', 'Bearer heyIamafaketokesdfn')
      .expect(401);
  });

  it('Testing the get item endpoint with valid token', async () => {
    await request
      .get(`${Api}/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Testing the update endpoint with an invalid token', async () => {
    await request
      .patch(`${Api}`)
      .set('Authorization', 'Bearer hesddkhgdkjhgyIamafaketoken')
      .send({ ...product, name: 'Ahmed Mohamed' })
      .expect(401);
  });

  it('Testing the update endpoint with a valid token', async () => {
    await request
      .patch(`${Api}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...product, name: 'Ahmed Hamdy' })
      .expect(200);
  });

  it('Testing the delete endpoint with valid token ', async () => {
    await request
      .delete(`${Api}/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ id: productId })
      .expect(200);
  });
});