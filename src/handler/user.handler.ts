import { NextFunction, Request , Response } from "express";
import UserStore from "../models/user";
import jwt from 'jsonwebtoken'
import config from '../../configuration'

const userStore = new UserStore();

export const create = async (request:Request , response :Response , next:NextFunction) => {
    
    try {
        console.log(request.body);
        const user = await userStore.create(request.body);
        response.json({
            status:'success',
            data:{...user},
            message: 'a user has been created!',
        })

    }
    catch(error){
        next(error)
    }
  };

  
export const getAll = async ( request: Request,response: Response,next: NextFunction) => {
    try {
      const users = await userStore.getAll()
      response.json({
        status: 'success',
        data: {...users},
        message: 'user has been retrieved!',
      })
    } catch (error) {
      next(error)
    }
  }
  
  export const getItem = async ( request: Request,response: Response,next: NextFunction) => { 
    try {
      const user = await userStore.getItem(+request.params.id)
      console.log(user)
      response.json({
        status: 'success',
        data: {...user},
        message: 'User has been retrieved',
      })
    } catch (error) {
      next(error)
    }
  }
  
  export const updateItem = async ( request: Request,response: Response,next: NextFunction) => { 
    try {
        console.log(request.body)
      const user = await userStore.updateItem(request.body)
      response.json({
        status: 'success',
        data: user,
        message: 'User has been updated!',
      })
    } catch (error) {
        console.log(error)
      next(error)
    }
  }
  
  export const deleteItem = async ( request: Request,response: Response,next: NextFunction) =>  {
    try {
      const user = await userStore.deleteItem(+request.params.id)
      response.json({
        status: 'success',
        data: {...user},
        message: 'User has been deleted!',
      })
    } catch (error) {
      next(error)
    }
  }

  export const authenticate = async ( request: Request,response: Response,next: NextFunction) => {
    try {
      const { email, password } = request.body;
      const user = await userStore.authenticate(email, password);
      const token = jwt.sign({ user },config.token as unknown as string)
      if (!user) {
        return response.status(401).json({
          status: 'error',
          message: 'the username and password are not matching',
        })
      }
      return response.json({
        status: 'success',
        data: { ...user, token },
        message: 'Logged in successfully',
      })
    } catch (err) {
      return next(err)
    }
  }