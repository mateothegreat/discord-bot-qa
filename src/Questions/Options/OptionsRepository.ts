import { Repository, EntityRepository } from 'typeorm';
import { Option } from './Option';

@EntityRepository(Option)
export class OptionsRepository extends Repository<Option> {

}
