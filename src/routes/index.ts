import { Router } from "express";
import userRoutes from './api/user.routes'
import productRoutes from '../routes/api/product.routes'
import orderRoutes from './api/order.routes'
const routes = Router();

routes.use('/users' , userRoutes);
routes.use('/products' , productRoutes);
routes.use('/orders' , orderRoutes);
export default routes;