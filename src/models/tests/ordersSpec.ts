import client from '../../database'
import OrderStore, { Order, OrderProduct } from '../order';
import UserStore, { User } from '../user';
import ProductStore, { Product} from '../product';

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

const user = {
  email: 'abdullah1@google.com',
  password: 'password123',
  first_name: 'abdallah',
  last_name: 'abdelkader'
} as User;

const order = {
  status: 'inprogress',
} as unknown as Order;

const product = {
  name:'apple',
  price: 12
} as unknown as Product;

let addedOrder: Order;
let addedUser: User;
let addedProduct: Product;
let addedOrderProduct: OrderProduct;

describe('Testing Order Store', () => {

  beforeAll(async () => {

    try
    {

    // added user
    const createdUser = await userStore.create(user)
    user.id = createdUser.id;
    order.user_id = user.id;

    // added product
    const createdProduct = await productStore.create(product);
    product.id = createdProduct.id;
    }

    catch(err)
    {
      console.log(err)
    }
  })

  afterAll(async () => {
    const connection = await client.connect()
    const orderProductSql = 'DELETE FROM order_products;'
    await connection.query(orderProductSql);
    const Ordersql = 'DELETE FROM orders;'
    await connection.query(Ordersql);
    const Usersql = 'DELETE FROM users;'
    await connection.query(Usersql);
    const Productsql = 'DELETE FROM products;'
    await connection.query(Productsql);
    connection.release()
  })

    it('Order method should be defined', () => {
      expect(orderStore.create).toBeDefined()
    });

    it('Testing Creation method', async () => {
  
      addedOrder = await orderStore.create(order);
      expect(order.status).toEqual(addedOrder.status);
    });

    it('Get method should be defined', () => {
      expect(orderStore.getItem).toBeDefined()
    })

    it('Get Item for exisiting item should not be null', async () => {

      const order = await orderStore.getItem(addedOrder.id)
      expect(order.id).toEqual(addedOrder.id);
    })

    it('Get All method should be defined', () => {
      expect(orderStore.getAll).toBeDefined()
    })

    it('Testing get all method', async () => {
   
      const orders = await orderStore.getAll()
      expect(orders.slice(-1)[0].id).toEqual(addedOrder.id);
    })

    it('Update method should be defined', () => {
      expect(orderStore.updateItem).toBeDefined()
    })

    it('Testing the update method', async () => {

      const updatedOrder = await orderStore.updateItem({
        ...addedOrder,
        status: 'in prog'
      })

      expect(updatedOrder.status).toBe('in prog');
    });

    
    it('add product method should be defined', () => {
      expect(orderStore.addProduct).toBeDefined();
    })

    it('Testing the add product method', async () => {
      addedOrderProduct = await orderStore.addProduct(20,addedOrder.id,product.id);
      expect(+addedOrderProduct.order_id).toEqual(+addedOrder.id);
      expect(+addedOrderProduct.product_id).toEqual(+product.id);
    });

    
    it('Deletion method should be defined', () => {
      expect(orderStore.deleteItem).toBeDefined();
    })
    
    it('Testing the delete method', async () => {
      addedOrderProduct = await orderStore.addProduct(20,addedOrder.id,product.id);
      const deletedOrder = await orderStore.deleteItem(addedOrder.id);
      expect(deletedOrder.id).toEqual(addedOrder.id);
    });
  })
