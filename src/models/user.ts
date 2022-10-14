import client from '../database'
import hashPassword from '../utility/hash'
import bcrypt from 'bcrypt';
import config from '../../configuration'


export type User={
    id: Number;
    email: string;
    password:string;
    first_name:string;
    last_name:string;
}

export class UserStore
{
    async index(): Promise<User[]>{

        try{
             const conn = await client.connect();
             const sql = 'SELECT * FROM users';
             const results = await conn.query(sql);
             conn.release();
             return results.rows;
          }
        catch(err){
             throw new Error (`app listening on port ${err}`);

        }
    }

    async create(user: User): Promise<User[]>{
        try{
             const conn = await client.connect();
             const hashedPassword = hashPassword(user);

           console.log(hashedPassword);
             const sql = `INSERT INTO users(email , password , first_name , last_name)
                          VALUES($1, $2 , $3 , $4) RETURNING *`;
             const results = await conn.query(sql,[user.email , hashedPassword , user.first_name , user.last_name]);
             conn.release();
             return results.rows[0];
          }
        catch(error){
            throw new Error(`Could not create new user ${(error as Error).message}`)
        }
    }

  async getAll(): Promise<User[]> {
    try {
      const connection = await client.connect()
      const sql ='SELECT id, first_name, last_name, email FROM users'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Could not retrieve all the users ${(error as Error).message}`)
    }
  }
 
  async getItem(id: Number): Promise<User> {
    try {
      const sql = `SELECT id, email, first_name, last_name FROM users 
      WHERE id=($1)`

      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
        console.log(error)
      throw new Error(`Could not find user ${id}, ${(error as Error).message}`)
    }
  }

  async updateItem(user: User): Promise<User> {
    try {
      const conn = await client.connect()
      const sql = `UPDATE users 
                  SET email=$2,first_name=$3, last_name=$4, password=$5
                  WHERE id=$1
                  RETURNING id, email, first_name, last_name`

      const result = await conn.query(sql, [
        user.id,user.email,user.first_name,user.last_name,user.password,
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not update user, ${(error as Error).message}`
      )
    }
  }

  async deleteItem(id: Number): Promise<User> {
    try {
      const conn = await client.connect()
      const sql = `DELETE FROM users 
                   WHERE id=($1) 
                   RETURNING id, email, 
                   first_name, last_name`

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not delete user ${id}, ${(error as Error).message}`
      )
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {

    try {

      const conn = await client.connect();

      const sql = `SELECT password FROM users
                   WHERE email=($1)`;

      const result = await conn.query(sql, [email]);

      if (result.rows.length) {

        const { password: hashPassword } = result.rows[0]

        if (bcrypt.compareSync(`${password}${config.pepper}`,hashPassword)) {

          const user = await conn.query(
            'SELECT id, email, first_name, last_name FROM users WHERE email=($1)',
            [email]
          )
          return user.rows[0];
        }
      }
      conn.release()
      return null
    } 
    catch (error) 
    {
      throw new Error(`Could not login: ${(error as Error).message}`)
    }
  }
}

export default UserStore;