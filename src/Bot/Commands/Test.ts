import { Command } from '../lib/Command';
import { CommandResult } from '../lib/CommandResult';
import { CommandMessage } from '../lib/CommandMessage';
import { CommandConfigArgumentType } from '../lib/CommandConfigArgumentType';
import { MessageEmbed } from 'discord.js';

export class Next implements Command {

    public readonly config = {

        name: 'Testing',
        description: 'Just a test command.',
        command: 'test',
        arguments: [

            {

                name: 'first',
                type: CommandConfigArgumentType.STRING

            }, {

                name: 'second',
                type: CommandConfigArgumentType.NUMBER

            }

        ]

    };

    public constructor() {

    }

    public handle(commandMessage: CommandMessage): CommandResult {

        console.log('test');
        console.log(commandMessage);

        const e = new MessageEmbed();

        e.setTitle('some title');
        e.setDescription('some description');
        e.setAuthor('asf');
        e.setFooter('some footer');

        e.addFields([ {

            name: 'field 1',
            value: 'value 1'

        }, {

            name: 'field 2',
            value: 'value 2'

        } ]);

        return {

            message: e

        };

    }

}
