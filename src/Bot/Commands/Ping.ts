import { Command } from '../lib/Command';
import { CommandResult } from '../lib/CommandResult';
import { CommandMessage } from '../lib/CommandMessage';

export class Ping implements Command {

    public readonly config = {

        name: 'Ping?',
        description: 'Return latency and stuff.',
        command: 'ping'

    };

    public async handle(commandMessage: CommandMessage): Promise<CommandResult> {

        return {

            message: 'pong!'

        };

    }

}
