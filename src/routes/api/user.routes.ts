import { Router } from "express";
import * as handler from '../../handler/user.handler'
import UserStore from "../../models/user";
import AuthenticateMiddleware from "../../utility/middleware/authentication";
const users = Router();

users.post('/',handler.create);
users.route('/').get(AuthenticateMiddleware,handler.getAll)
users.route('/').patch( AuthenticateMiddleware,handler.updateItem)
users.route('/login').post( handler.authenticate)
users.route('/:id').get(AuthenticateMiddleware,handler.getItem)
users.route('/:id').delete(AuthenticateMiddleware, handler.deleteItem)


export default users;