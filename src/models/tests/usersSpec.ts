import {User , UserStore} from '../user'
import client from '../../database'
const userStore = new UserStore();
import hash from '../../utility/hash';
const user = {
  email: 'abdallah@google.com',
  password: 'password123',
  first_name: 'abdallah',
  last_name: 'abdelkader'
} as User;
let addedUser: User;

describe('Testing User Store', () => {


    it('Creation method should be defined', () => {
      expect(userStore.create).toBeDefined()
    });

    it('Testing Creation method', async () => {
  
      addedUser = await userStore.create(user);
      expect(user.email).toEqual(addedUser.email);
      expect(user.first_name).toEqual(addedUser.first_name);
      expect(user.last_name).toEqual(addedUser.last_name);

    });

    it('Get method should be defined', () => {
      expect(userStore.getItem).toBeDefined()
    })

    it('Get Item for exisiting item should not be null', async () => {

      const user = await userStore.getItem(addedUser.id)
      expect(user.id).toEqual(addedUser.id);
    })

    it('Get All method should be defined', () => {
      expect(userStore.getAll).toBeDefined()
    })

    it('Testing get all method', async () => {
   
      const users = await userStore.getAll()
      expect(users.slice(-1)[0].id).toEqual(addedUser.id);
    })

    it('Update method should be defined', () => {
      expect(userStore.updateItem).toBeDefined()
    })

    it('Testing the update method', async () => {

      const updatedUser = await userStore.updateItem({
        ...addedUser,
        email: 'Hussam'
      })

      expect(updatedUser.email).toBe('Hussam')
    });


    it('Deletion method should be defined', () => {
      expect(userStore.deleteItem).toBeDefined()
    })

  
    it('Testing the delete method', async () => {
      const deletedUser = await userStore.deleteItem(addedUser.id);
      expect(deletedUser.id).toEqual(addedUser.id);
    });


  })
