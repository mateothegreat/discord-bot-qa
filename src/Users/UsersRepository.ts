import { EntityRepository, Repository } from 'typeorm';
import { User } from './User';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    
}
