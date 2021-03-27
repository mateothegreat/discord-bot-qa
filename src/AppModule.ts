import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './Questions/Question';
import { QuestionsRepository } from './Questions/QuestionsRepository';
import { Option } from './Questions/Options/Option';
import { OptionsRepository } from './Questions/Options/OptionsRepository';
import { AnswersRepository } from './Answers/AnswersRepository';
import { Answer } from './Answers/Answer';
import { User } from './Users/User';
import { UsersRepository } from './Users/UsersRepository';
import { BotService } from './Bot/BotService';
import { QuestionsService } from './Questions/QuestionsService';
import { AnswersService } from './Answers/AnswersService';

dotenv.config();

@Module({

    imports: [

        TypeOrmModule.forRoot({

            type: 'mysql',
            host: process.env.DB_HOSTNAME,
            port: Number.parseInt(process.env.DB_PORT) || 3306,
            username: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || 'mysql',
            database: process.env.DB_NAME || 'tco',
            synchronize: process.env.DB_SYNCHRONIZE === 'true' || true,
            connectTimeout: 30000,
            logging: process.env.DB_LOGGING === 'true',
            keepConnectionAlive: true,
            entities: [

                Question,
                Option,
                Answer,
                User

            ]

        }),

        TypeOrmModule.forFeature([

            QuestionsRepository,
            OptionsRepository,
            AnswersRepository,
            UsersRepository

        ])

    ],

    providers: [

        QuestionsService,
        AnswersService,
        BotService

    ]

})
export class AppModule {
}
