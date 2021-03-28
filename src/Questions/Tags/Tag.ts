import { Entity, Column, ManyToMany, Unique } from 'typeorm';
import { EntityBase } from '@nestjs.pro/common/dist/entities/EntityBase';
import { Question } from '../Question';

@Entity('questions_tags')
@Unique([ 'name' ])
export class Tag extends EntityBase {

    @ManyToMany(() => Question, question => question.tags, { eager: false })
    public questions: Array<Question>;

    @Column()
    public name: string;

}
