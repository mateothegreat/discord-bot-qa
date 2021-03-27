import { Question } from './Question';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Question)
export class QuestionsRepository extends Repository<Question> {


}
