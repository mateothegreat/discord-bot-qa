import { EntityRepository, Repository } from 'typeorm';
import { Tag } from './Tag';

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag> {

}
