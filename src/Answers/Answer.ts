import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { EntityBase } from '@nestjs.pro/common/dist/entities/EntityBase';
import { Question } from '../Questions/Question';
import { Option } from '../Questions/Options/Option';
import { User } from '../Users/User';

@Entity('answers')
export class Answer extends EntityBase {

    @OneToOne(() => User)
    @JoinColumn()
    public user: User;

    @OneToOne(() => Question)
    @JoinColumn()
    public question: Question;

    @OneToOne(() => Option)
    @JoinColumn()
    public option: Option;

    @Column({ type: 'boolean' })
    public isAnswer: boolean;

    @Column({ type: 'text' })
    public answer: string;

}
