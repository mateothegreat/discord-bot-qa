import { Injectable } from '@nestjs/common';
import { TagsRepository } from './TagsRepository';
import { Tag } from './Tag';

@Injectable()
export class TagsService {

    public constructor(private readonly tagsRepository: TagsRepository) {

    }

    public async getByName(name: string): Promise<Tag> {

        return this.tagsRepository.findOneOrFail({ where: { name } });
        
    }

    public async createIfNotExists(name: string): Promise<Tag> {

        try {

            return await this.getByName(name);

        } catch (e) {

            return this.tagsRepository.save({

                name

            });

        }

    }

}
