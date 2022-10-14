import bcrypt from 'bcrypt';
import config from '../../configuration'
import { User } from '../models/user';

export default  (user:User):string => { return bcrypt.hashSync(
    user.password + config.pepper, 
    Number(config.salt)
 )};