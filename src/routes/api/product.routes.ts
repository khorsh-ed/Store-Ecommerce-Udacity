import { Router } from "express";
import * as handler from '../../handler/product.handler'
import UserStore from "../../models/user";
import AuthenticateMiddleware from "../../utility/middleware/authentication";
const products = Router();

products.post('/',handler.create);
products.route('/').get(AuthenticateMiddleware,handler.getAll)
products.route('/').patch(AuthenticateMiddleware,handler.updateItem)
products.route('/:id').get(AuthenticateMiddleware,handler.getItem)
products.route('/:id').delete(AuthenticateMiddleware,handler.deleteItem)


export default products;