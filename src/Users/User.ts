import { Entity, Column } from 'typeorm';
import { EntityBase } from '@nestjs.pro/common/dist/entities/EntityBase';

@Entity()
export class User extends EntityBase {

    @Column()
    public serverId: string;

    @Column()
    public userId: string;

}
