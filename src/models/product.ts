import client from '../database'
import hashPassword from '../utility/hash'
import bcrypt from 'bcrypt';
import config from '../../configuration'


export type Product={
    id: Number;
    name: string;
    price:Number;
}

export class ProductStore
{
    async index(): Promise<Product[]>{

        try{
             const conn = await client.connect();
             const sql = 'SELECT * FROM products';
             const results = await conn.query(sql);
             conn.release();
             return results.rows;
          }
        catch(err){
             throw new Error (`could not retrieve products ${err}`);

        }
    }

    async create(product: Product): Promise<Product>{
        try{
             const conn = await client.connect();
             const sql = `INSERT INTO products(name , price)
                          VALUES($1, $2) RETURNING *`;
             const results = await conn.query(sql,[product.name , product.price]);
             conn.release();
             return results.rows[0];
          }
        catch(error){
            throw new Error(`Could not create new product ${(error as Error).message}`)
        }
    }

  async getAll(): Promise<Product[]> {
    try {
      const connection = await client.connect()
      const sql ='SELECT id, name, price FROM products'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Could not retrieve all the products ${(error as Error).message}`)
    }
  }
 
  async getItem(id: Number): Promise<Product> {
    try {
      const sql = `SELECT id, name, price FROM products 
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

  async updateItem(product: Product): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = `UPDATE products 
                  SET name=$2,price=$3
                  WHERE id=$1
                  RETURNING id, name , price`

      const result = await conn.query(sql, [
        product.id,product.name,product.price,
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not update user, ${(error as Error).message}`
      )
    }
  }

  async deleteItem(id: Number): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = `DELETE FROM products 
                   WHERE id=($1) 
                   RETURNING id, name,price 
                   `

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not delete user ${id}, ${(error as Error).message}`
      )
    }
  }
}

export default ProductStore;