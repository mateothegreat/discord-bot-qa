import { CommandResult } from './CommandResult';
import { CommandMessage } from './CommandMessage';
import { CommandConfig } from './CommandConfig';

export interface Command {

    readonly config: CommandConfig;

    handle(commandMessage: CommandMessage): CommandResult;

}
