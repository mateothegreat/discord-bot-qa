import { Repository, EntityRepository } from 'typeorm';
import { Answer } from './Answer';

@EntityRepository(Answer)
export class AnswersRepository extends Repository<Answer> {

}
