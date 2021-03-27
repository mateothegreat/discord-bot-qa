import { Client, Message } from 'discord.js';
import { BotService } from './BotService';
import * as Glob from 'glob';
import { Command } from './lib/Command';
import { commandParse } from './lib/CommandParser';
import { BotConfig } from './lib/BotConfig';
import { commandArgumentsTransformer } from './lib/CommandArgumentsTransformer';

export class Bot {

    public config;
    private client: Client;
    private commands: { [ name: string ]: Command } = {};

    public constructor(private readonly botService: BotService) {

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

    private handleMessage(message: Message) {

        if (!message.author.bot) {

            const parsed = commandParse(this.config.prefix, message.cleanContent);

            if (parsed && this.commands[ parsed.name ]) {

                console.log(`Handling command: ${ parsed.name } (${ JSON.stringify(parsed.args) }) ..`);

                if (!this.commands[ parsed.name ].config.arguments && parsed.args.length === 0 || (this.commands[ parsed.name ].config.arguments && this.commands[ parsed.name ].config.arguments.length === parsed.args.length)) {

                    const result = this.commands[ parsed.name ].handle({

                        args: commandArgumentsTransformer(this.commands[ parsed.name ].config, parsed.args)

                    });

                    message.reply(result.message);

                } else {

                    console.log(`Ignoring command: ${ parsed.name } (${ JSON.stringify(parsed.args) }) = wrong arguments length`);

                }

            } else {

                console.log(`Ignoring command: ${ parsed.name } (${ JSON.stringify(parsed.args) }) = command not found`);

            }

        }

    }

}
