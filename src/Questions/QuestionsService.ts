import { Injectable } from '@nestjs/common';
import { QuestionsRepository } from './QuestionsRepository';
import { Question } from './Question';
import { TagsService } from './Tags/TagsService';
import { AnswersService } from '../Answers/AnswersService';
import { QuestionType } from './QuestionType';

@Injectable()
export class QuestionsService {

    public constructor(private readonly questionsRepository: QuestionsRepository,
                       private readonly answersService: AnswersService,
                       private readonly tagsService: TagsService) {

        const questions = require('../../data/questions.json');

        this.createFromJSON(questions);

        // this.getOneUnanswered().then(q => {
        //
        //     console.log(q);
        //
        // });

    }

    public async createFromJSON(questions: any) {

        for (let i = 0; i < questions.length; i++) {

            const tags = [];

            for (let j = 0; j < questions[ i ].tags.length; j++) {

                tags.push(await this.tagsService.createIfNotExists(questions[ i ].tags[ j ].name));

            }

            questions[ i ].tags = tags;

            this.createIfNotExists(questions[ i ]);

        }

        this.getAll().then(results => {

            results.forEach(result => {

                if (result.options.length > 0 && result.tags.length > 0) {

                    console.log(JSON.stringify(result, null, 4));

                }

            });

        });

    }

    public getAll(): Promise<Array<Question>> {

        return this.questionsRepository.find({

            relations: [ 'options', 'tags' ]

        });

    }

    public async getOneUnanswered(): Promise<Question> {

        return this.questionsRepository.query(`
        
            SELECT  q.question              AS question,
                    q.type                  AS type,
                    GROUP_CONCAT(t.name)    AS tags
                                
            FROM questions q
        
            INNER JOIN questions_tags_links tl  ON tl.questionsId = q.id
            INNER JOIN questions_tags t         ON t.id = tl.questionsTagsId
            
            GROUP BY q.id 
            
            ORDER BY RAND()
            
            LIMIT 1

        `);

    }

    public getByQuestionAndType(question: string, type: QuestionType): Promise<Question> {

        return this.questionsRepository.findOneOrFail({ where: { question, type } });

    }

    public async createIfNotExists(question: Question): Promise<Question> {

        try {

            const entity = await this.getByQuestionAndType(question.question, question.type);

            entity.question = question.question;
            entity.tags = question.tags;
            entity.options = question.options;

            return await this.questionsRepository.save(entity);

        } catch (e) {

            return this.questionsRepository.save(question);

        }

    }

}
