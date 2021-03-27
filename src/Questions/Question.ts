import { Entity, Column, OneToMany } from 'typeorm';
import { EntityBase } from '@nestjs.pro/common/dist/entities/EntityBase';
import { QuestionType } from './QuestionType';
import { Option } from './Options/Option';

@Entity('questions')
export class Question extends EntityBase {

    @Column()
    public question: string;

    @Column()
    public type: QuestionType;

    @OneToMany(() => Option, options => options.question)
    public options: Array<Option>;

}
