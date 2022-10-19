import supertest from 'supertest';
import app from '../../index';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import { Product } from '../../models/product';
import client from '../../database'
const request = supertest(app);

describe('Testing Order EndPoint', () => {
    
  const order = {
      status: 'apple',
    } as unknown as Order;

  const user = {
        email: 'ahssmahjm',
        password: 'pass',
        first_name: 'abdallah',
        last_name: 'abdelkader'
      } as User;

  const product = {
        name:'apple',
        price: 12
      } as unknown as Product;

  let productId: number;
  let userApi:String = '/api/users';
  let productApi:String = '/api/products';
  let Api:String = '/api/orders';
  let token:String;

  beforeAll(async () => {

    await request
      .post(`${userApi}/`)
      .send(user)
      .expect(200)
      .then((res) => {
        token = JSON.parse(res.text).token;
        order.user_id = JSON.parse(res.text).data.id;
      });

      await request
      .post(`${productApi}/`)
      .send({...product})
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        productId = JSON.parse(res.text).data.id;
      });
  });

  afterAll(async () => {
    const connection = await client.connect()
    const usersql = 'DELETE FROM users;'
    await connection.query(usersql);
    const ordersql = 'DELETE FROM orders;'
    await connection.query(ordersql);
    const productsql = 'DELETE FROM products;'
    await connection.query(productsql);
    connection.release();
  })

  it('Testing the create endpoint with invalid token', async () => {
    await request
      .post(`${Api}/`)
      .send({...order})
      .set('Authorization', `Bearer kjlhskjshks`)
      .expect(401);
  });

  it('Testing the create endpoint with valid token ', async () => {
       await request
      .post(`${Api}`)
      .send(order)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        order.id = JSON.parse(res.text).data.id;
      });
  });

  it('Testing the get item endpoint with valid token ', async () => {
    await request
      .get(`${Api}/${order.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Testing the get item endpoint with invalid token ', async () => {
    await request
      .get(`${Api}/${order.id}`)
      .set('Authorization', `Bearer kjdhgjdgdjgkdj`)
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


  it('Testing the update endpoint with an invalid token', async () => {
    await request
      .patch(`${Api}`)
      .set('Authorization', 'Bearer hesddkhgdkjhgyIamafaketoken')
      .send({ ...order, status: 'Ahohamed' })
      .expect(401);
  });

  it('Testing the update endpoint with a valid token', async () => {
    await request
      .patch(`${Api}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...order, status: 'Ahmedy' })
      .expect(200);
  });

  it('Testing the delete endpoint with invalid token ', async () => {
    await request
      .delete(`${Api}/${order.id}`)
      .set('Authorization', `Bearer jhgskjgskjsgskj`)
      .expect(401);
  });

  it('Testing the delete endpoint with valid token ', async () => {
    await request
      .delete(`${Api}/${order.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Testing the add product endpoint with invalid token ', async () => {
    await request
      .delete(`${Api}/${order.id}`)
      .set('Authorization', `Bearer jhgskjgskjsgskj`)
      .send({
        productId: productId,
        quantity: 20
      })
      .expect(401);
  });

  it('Testing the add product endpoint with valid token ', async () => {
    await request
      .delete(`${Api}/${order.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        productId: productId,
        quantity: 20
      })
      .expect(200);
  });

});