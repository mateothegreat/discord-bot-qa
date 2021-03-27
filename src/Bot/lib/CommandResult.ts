import { MessageEmbed } from 'discord.js';
import { CommandResultScope } from './CommandResultScope';

export class CommandResult {

    public scope?: CommandResultScope;

    public users?: Array<string>;

    public message: string | MessageEmbed;

}
