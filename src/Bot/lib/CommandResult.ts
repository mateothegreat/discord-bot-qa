import { MessageEmbed } from 'discord.js';
import { CommandResultScope } from './CommandResultScope';
import { CommandReaction } from './CommandReaction';

export class CommandResult {

    public scope?: CommandResultScope;

    public users?: Array<string>;

    public message: string | MessageEmbed;

    public reactions?: Array<CommandReaction>;

}
