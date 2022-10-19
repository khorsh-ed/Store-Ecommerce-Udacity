import supertest from 'supertest';
import app from '../../index';
import { User } from '../../models/user';
import client from '../../database'
const request = supertest(app);

describe('Testing User EndPoint', () => {
  const user = {
      email: 'ahmgoogle.com',
      password: 'pass',
      first_name: 'abdallah',
      last_name: 'abdelkader'
    } as User;


  let userId: number;
  let userApi:String = '/api/users';
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



  it('Testing the create endpoint', async () => {
    await request
      .post(`${userApi}/`)
      .send({...user,email:'ahm'})
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        userId = JSON.parse(res.text).data.id;
      });
  });

  it('Testing the getall endpoint with valid token', async () => {
    await request
      .get(`${userApi}/`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Testing the getall endpoint with invalid token', async () => {
    await request
      .get(`${userApi}/`)
      .set('Authorization', 'Bearer heyIamafaketokesdfn')
      .expect(401);
  });

  it('Testing the get item endpoint with valid token and valid student ID', async () => {
    await request
      .get(`${userApi}/`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Testing the update endpoint with an invalid token', async () => {
    await request
      .patch(`${userApi}`)
      .set('Authorization', 'Bearer hesddkhgdkjhgyIamafaketoken')
      .send({ ...user, name: 'Ahmed Mohamed' })
      .expect(401);
  });

  it('Testing the update endpoint with a valid token', async () => {
    await request
      .patch(`${userApi}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...user, name: 'Ahmed Hamdy' })
      .expect(200);
  });

  it('Testing the delete endpoint with valid token ', async () => {
    await request
      .delete(`${userApi}/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ id: userId })
      .expect(200);
  });
});