import { Client, Message, MessageReaction, ClientUser } from 'discord.js';
import { BotService } from './BotService';
import * as Glob from 'glob';
import { Command } from './lib/Command';
import { commandParse } from './lib/CommandParser';
import { BotConfig } from './lib/BotConfig';
import { commandArgumentsTransformer } from './lib/CommandArgumentsTransformer';

export class Bot {

    private readonly config: BotConfig;

    private client: Client;
    private commands: { [ name: string ]: Command } = {};

    public constructor(public readonly botService: BotService) {

        this.config = new BotConfig();

        const commands = Glob.sync(`${ __dirname }/Commands/*js`);

        commands.forEach(command => {

            console.log(`Loading command: ${ command } ..`);

            const f = require(command);
            const c = new f[ Object.keys(f)[ 0 ] ]();

            this.commands[ c.config.command ] = c;

        });

    }

    public connect(token: string) {

        this.client = new Client();

        this.client.login(token);

        this.client.on('ready', () => {

            console.log(`${ new Date().toString() } bot started!`);

        });

        this.client.on('message', (message: Message) => {

            this.handleMessage(message);

        });

    }

    private async handleMessage(message: Message) {

        if (!message.author.bot) {

            const parsed = commandParse(this.config.prefix, message.cleanContent);

            if (parsed && this.commands[ parsed.name ]) {

                console.log(`Handling command: ${ parsed.name } (${ JSON.stringify(parsed.args) }) ..`);

                if (!this.commands[ parsed.name ].config.arguments && parsed.args.length === 0 || (this.commands[ parsed.name ].config.arguments && this.commands[ parsed.name ].config.arguments.length === parsed.args.length)) {

                    const result = await this.commands[ parsed.name ].handle({

                        args: commandArgumentsTransformer(this.commands[ parsed.name ].config, parsed.args)

                    }, this);

                    const reply = await message.reply(result.message);

                    for (let i = 0; i < result.reactions.length; i++) {

                        await reply.react(result.reactions[ i ].emoji);

                    }

                    const filter = (reaction: MessageReaction, user: ClientUser): boolean => {

                        for (let i = 0; i < result.reactions.length; i++) {

                            if (result.reactions[ i ].emoji === reaction.emoji.name) {

                                this.commands[ parsed.name ].reacted(reaction, user);

                            }

                        }

                        return false;

                    };

                    await reply.awaitReactions(filter);

                } else {

                    console.log(`Ignoring command: ${ parsed.name } (${ JSON.stringify(parsed.args) }) = wrong arguments length`);

                }

            } else {

                console.log(`Ignoring command: ${ parsed.name } (${ JSON.stringify(parsed.args) }) = command not found`);

            }

        }

    }

    private static handleReaction(command: Command, reaction: MessageReaction, user: ClientUser): void {

        command.reacted(reaction, user);

    }

}
