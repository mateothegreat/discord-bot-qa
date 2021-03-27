import { Command } from '../lib/Command';
import { CommandResult } from '../lib/CommandResult';
import { CommandMessage } from '../lib/CommandMessage';

export class Next implements Command {

    public readonly config = {

        name: 'Next',
        description: 'Get the next question.',
        command: 'next'

    };

    public constructor() {

    }

    public handle(commandMessage: CommandMessage): CommandResult {

        console.log('nexxxt');
        return {

            message: 'asdfasdf'

        };

    }

}
