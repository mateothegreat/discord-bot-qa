import { Entity, Column, OneToMany, ManyToMany, JoinTable, Unique } from 'typeorm';
import { EntityBase } from '@nestjs.pro/common/dist/entities/EntityBase';
import { QuestionType } from './QuestionType';
import { Option } from './Options/Option';
import { Tag } from './Tags/Tag';

@Entity('questions')
@Unique([ 'question', 'type' ])

export class Question extends EntityBase {

    @ManyToMany(() => Tag, tag => tag.questions, { eager: false })
    @JoinTable({ name: 'questions_tags_links' })
    public tags: Array<Tag>;

    @Column()
    public question: string;

    @Column()
    public type: QuestionType;

    @OneToMany(() => Option, options => options.question, { cascade: [ 'insert', 'update' ] })
    public options: Array<Option>;

}
