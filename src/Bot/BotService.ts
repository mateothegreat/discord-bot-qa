import { Injectable } from '@nestjs/common';
import { Bot } from './Bot';
import { QuestionsService } from '../Questions/QuestionsService';
import { AnswersService } from '../Answers/AnswersService';

@Injectable()
export class BotService {

    private readonly bot: Bot;

    public constructor(public readonly questionsService: QuestionsService,
                       public readonly answersService: AnswersService) {

        this.bot = new Bot(this);

        this.bot.connect(process.env.TOKEN);

    }

}
