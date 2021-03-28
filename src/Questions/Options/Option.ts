import { Entity, ManyToOne, Column } from 'typeorm';
import { EntityBase } from '@nestjs.pro/common/dist/entities/EntityBase';
import { Question } from '../Question';
import { OptionType } from './OptionType';

@Entity('questions_options')
export class Option extends EntityBase {

    @ManyToOne(() => Question, question => question.options)
    public question: Question;

    @Column({ type: 'boolean' })
    public isCorrect: boolean;

    @Column()
    public type: OptionType;

    @Column({ type: 'text' })
    public option: string;

}
