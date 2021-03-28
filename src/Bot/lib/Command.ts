import { CommandResult } from './CommandResult';
import { CommandMessage } from './CommandMessage';
import { CommandConfig } from './CommandConfig';
import { Bot } from '../Bot';
import { MessageReaction, ClientUser } from 'discord.js';

export interface Command {

    readonly config: CommandConfig;

    handle(commandMessage: CommandMessage, bot: Bot): Promise<CommandResult>;

    reacted(reaction: MessageReaction, user: ClientUser): void

}
