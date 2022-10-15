
import client from '../../database'
import OrderStore, { Order } from '../order';

const orderStore = new OrderStore();

const order = {
  status: 'inprogress',
  user_id: 1
} as unknown as Order;

let addedOrder: Order;

describe('Testing User Store', () => {


    it('Creation method should be defined', () => {
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

      const user = await orderStore.getItem(addedOrder.id)
      expect(user.id).toEqual(addedOrder.id);
    })

    it('Get All method should be defined', () => {
      expect(orderStore.getAll).toBeDefined()
    })

    it('Testing get all method', async () => {
   
      const users = await orderStore.getAll()
      expect(users.slice(-1)[0].id).toEqual(addedOrder.id);
    })

    it('Update method should be defined', () => {
      expect(orderStore.updateItem).toBeDefined()
    })

    it('Testing the update method', async () => {

      const updatedUser = await orderStore.updateItem({
        ...addedOrder,
        status: 'in prog'
      })

      expect(updatedUser.status).toBe('in prog')
    });


    it('Deletion method should be defined', () => {
      expect(orderStore.deleteItem).toBeDefined()
    })

  
    it('Testing the delete method', async () => {
      const deletedUser = await orderStore.deleteItem(addedOrder.id);
      expect(deletedUser.id).toEqual(addedOrder.id);
    });


  })
