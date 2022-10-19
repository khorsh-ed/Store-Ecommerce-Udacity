import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import Error from '../../Interfaces/error'
import config from '../../../configuration'



const handleUnauthorizedUser = (response: Response) => {
  response
      .status(401)
      .send(
        '<h2> Login again please <h2>'
      );
}

const AuthenticateMiddleware = ( request:Request , response: Response, next: NextFunction) => {
  try {
    const authorizationHeader = request.get('Authorization')
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1]
      if (token ) {
        const decode = jwt.verify(token, config.token as unknown as string )
        if (decode) {
          next()
        } else {
            handleUnauthorizedUser(response)
        }
      } 
      else {
        handleUnauthorizedUser(response)
      }
    } else {
        handleUnauthorizedUser(response)
    }
  } catch (error) {
    handleUnauthorizedUser(response)
  }
}

export default AuthenticateMiddleware