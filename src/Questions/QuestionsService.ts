import { Injectable } from '@nestjs/common';
import { QuestionsRepository } from './QuestionsRepository';

@Injectable()
export class QuestionsService {

    public constructor(private readonly questionsRepository: QuestionsRepository) {

    }

}
