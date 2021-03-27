import { CommandConfigArgument } from './CommandConfigArgument';

export interface CommandConfig {

    name: string;
    description: string;
    command: string;
    arguments?: Array<CommandConfigArgument>;

}
