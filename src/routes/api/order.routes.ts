import { Router } from "express";
import * as handler from '../../handler/order.handler'
import AuthenticateMiddleware from "../../utility/middleware/authentication";
const products = Router();

products.post('/',handler.create);
products.route('/').get(handler.getAll)
products.route('/').patch(handler.updateItem)
products.route('/:id').get(handler.getItem)
products.route('/:id').delete(handler.deleteItem)


export default products;