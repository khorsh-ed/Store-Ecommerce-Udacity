import { NextFunction, Request , Response } from "express";
import ProductStore from "../models/product";
import jwt from 'jsonwebtoken'
import config from '../../configuration'

const productStore = new ProductStore();

export const create = async (request:Request , response :Response , next:NextFunction) => {
    
    try {
        const product = await productStore.create(request.body);
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
      const products = await productStore.getAll()
      response.json({
        status: 'success',
        data: {...products},
        message: 'products have been retrieved!',
      })
    } catch (error) {
      next(error)
    }
  }
  
  export const getItem = async ( request: Request,response: Response,next: NextFunction) => { 
    try {
      const product = await productStore.getItem(+request.params.id)
      response.json({
        status: 'success',
        data: {...product},
        message: 'product has been retrieved',
      })
    } catch (error) {
      next(error)
    }
  }
  
  export const updateItem = async ( request: Request,response: Response,next: NextFunction) => { 
    try {
      const product = await productStore.updateItem(request.body)
      response.json({
        status: 'success',
        data: product,
        message: 'Product has been updated!',
      })
    } catch (error) {
        console.log(error)
      next(error)
    }
  }
  
  export const deleteItem = async ( request: Request,response: Response,next: NextFunction) =>  {
    try {
      const user = await productStore.deleteItem(+request.params.id)
      response.json({
        status: 'success',
        data: {...user},
        message: 'User has been deleted!',
      })
    } catch (error) {
      next(error)
    }
  }