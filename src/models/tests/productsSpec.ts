import {User , UserStore} from '../user'
import client from '../../database'
import hash from '../../utility/hash';
import ProductStore, { Product } from '../product';

const productStore = new ProductStore();

const product = {
  name:'apple',
  price: 12
} as unknown as Product;
let addedProduct: Product;

describe('Testing Product Store', () => {

    it('Creation method should be defined', () => {
      expect(productStore.create).toBeDefined()
    });

    it('Testing Creation method', async () => {
  
      addedProduct = await productStore.create(product);
      expect(product.name).toEqual(addedProduct.name);
      expect(product.price).toEqual(addedProduct.price);

    });

    it('Get method should be defined', () => {
      expect(productStore.getItem).toBeDefined()
    })

    it('Get Item for exisiting item should not be null', async () => {

      const product = await productStore.getItem(addedProduct.id)
      expect(product.id).toEqual(addedProduct.id);
    })

    it('Get All method should be defined', () => {
      expect(productStore.getAll).toBeDefined()
    })

    it('Testing get all method', async () => {
   
      const products = await productStore.getAll()
      expect(products.slice(-1)[0].id).toEqual(addedProduct.id);
    })

    it('Update method should be defined', () => {
      expect(productStore.updateItem).toBeDefined()
    })

    it('Testing the update method', async () => {

      const updatedUser = await productStore.updateItem({
        ...addedProduct,
        name: 'kometra'
      })

      expect(updatedUser.name).toBe('kometra')
    });


    it('Deletion method should be defined', () => {
      expect(productStore.deleteItem).toBeDefined()
    })

  
    it('Testing the delete method', async () => {
      const deletedProduct = await productStore.deleteItem(addedProduct.id);
      expect(deletedProduct.id).toEqual(addedProduct.id);
    });


  })
