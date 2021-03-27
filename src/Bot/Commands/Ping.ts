import { Command } from '../lib/Command';
import { CommandResult } from '../lib/CommandResult';
import { CommandMessage } from '../lib/CommandMessage';

export class Ping implements Command {

    public readonly config = {

        name: 'Ping?',
        description: 'Return latency and stuff.',
        command: 'ping'

    };

    public handle(commandMessage: CommandMessage): CommandResult {

        return {

            message: 'pong!'

        };

    }

}
