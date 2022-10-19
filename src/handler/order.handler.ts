import { NextFunction, Request , Response } from "express";
import OrderStore, { OrderProduct } from "../models/order";
import jwt from 'jsonwebtoken'
import config from '../../configuration'

const orderStore = new OrderStore();

export const create = async (request:Request , response :Response , next:NextFunction) => {

    
    try {
        const product = await orderStore.create(request.body);
        response.json({
            status:'success',
            data:{...product},
            message: 'a product has been created!',
        })
    }
    catch(error){
        next(error)
    }
  };

  
export const getAll = async ( request: Request,response: Response,next: NextFunction) => {
    try {
      const orders = await orderStore.getAll()
      response.json({
        status: 'success',
        data: {...orders},
        message: 'orders have been retrieved!',
      })
    } catch (error) {
      next(error)
    }
  }
  
  export const getItem = async ( request: Request,response: Response,next: NextFunction) => { 
    try {
      const order = await orderStore.getItem(+request.params.id)
      response.json({
        status: 'success',
        data: {...order},
        message: 'order has been retrieved',
      })
    } catch (error) {
      next(error)
    }
  }
  
  export const updateItem = async ( request: Request,response: Response,next: NextFunction) => { 
    try {
      const product = await orderStore.updateItem(request.body)
      response.json({
        status: 'success',
        data: product,
        message: 'Order has been updated!',
      })
    } catch (error) {
      next(error)
    }
  }
  
  export const deleteItem = async ( request: Request,response: Response,next: NextFunction) =>  {
    try {
      const order = await orderStore.deleteItem(+request.params.id)
      response.json({
        status: 'success',
        data: {...order},
        message: 'Order has been deleted!',
      })
    } catch (error) {
      next(error)
    }
  }

  export const addProduct = async ( request: Request,response: Response,next: NextFunction) =>  {
    try {
      const orderId: Number = +request.params.id;
      const productId: Number = +request.body.productId;
      const quantity: Number = +request.body.quantity;
      const orderProduct: OrderProduct= await orderStore.addProduct(quantity , orderId , productId);

      response.json({
        status: 'success',
        data: {...orderProduct},
        message: 'Product has been added!',
      })
    } catch (error) {
      next(error)
    }
  }

