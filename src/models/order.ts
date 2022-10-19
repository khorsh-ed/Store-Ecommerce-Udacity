import client from '../database'
import bcrypt from 'bcrypt';
import config from '../../configuration'


export type Order={
    id: Number;
    status: string;
    user_id:Number
}

export type OrderProduct={
  id: Number;
  quantity: Number;
  order_id:Number;
  product_id:Number;
}

export class OrderStore
{
    async index(): Promise<Order[]>{

        try{
             const conn = await client.connect();
             const sql = 'SELECT * FROM orders';
             const results = await conn.query(sql);
             conn.release();
             return results.rows;
          }
        catch(err){
             throw new Error (`could not retrieve orders ${err}`);

        }
    }

    async create(order: Order): Promise<Order>{
        try{
             const conn = await client.connect();
             const sql = `INSERT INTO orders(status , user_id)
                          VALUES($1, $2) RETURNING *`;
             const results = await conn.query(sql,[ order.status, order.user_id]);
             conn.release();
             return results.rows[0];
          }
        catch(error){
            throw new Error(`Could not create new order ${(error as Error).message}`)
        }
    }

  async getAll(): Promise<Order[]> {
    try {
      const connection = await client.connect()
      const sql ='SELECT * FROM orders'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Could not retrieve all the orders ${(error as Error).message}`)
    }
  }
 
  async getItem(id: Number): Promise<Order> {
    try {
      const sql = `SELECT * FROM orders 
      WHERE id=($1)`

      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
        console.log(error)
      throw new Error(`Could not find order ${id}, ${(error as Error).message}`)
    }
  }

  async updateItem(order: Order): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql = `UPDATE orders 
                  SET status=$2
                  WHERE id=$1
                  RETURNING *`

      const result = await conn.query(sql, [
        order.id,order.status,
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not update order, ${(error as Error).message}`
      )
    }
  }

  async deleteItem(id: Number): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql = `DELETE FROM orders 
                   WHERE id=($1) 
                   RETURNING *
                   `

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not delete order ${id}, ${(error as Error).message}`
      )
    }
  }

  async addProduct(quantity: Number , orderId :Number , productId: Number): Promise<OrderProduct> {
    try {
      const conn = await client.connect()
      const sql = `INSERT INTO order_products(quantity , order_id , product_id) VALUES ($1,$2,$3) RETURNING *`
      const result = await conn.query(sql, [quantity, orderId , productId])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not add product ${productId}, ${(error as Error).message}`
      )
    }
  }
}

export default OrderStore;