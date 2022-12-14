import { Router } from "express";
import * as handler from '../../handler/order.handler'
import AuthenticateMiddleware from "../../utility/middleware/authentication";
const order = Router();

order.post('/',AuthenticateMiddleware,handler.create);
order.route('/').get(AuthenticateMiddleware,handler.getAll)
order.route('/').patch(AuthenticateMiddleware,handler.updateItem)
order.route('/:id').get(AuthenticateMiddleware,handler.getItem)
order.route('/:id').delete(AuthenticateMiddleware,handler.deleteItem)
order.route('/:id').post(AuthenticateMiddleware,handler.addProduct)

export default order;