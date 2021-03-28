import { Command } from '../lib/Command';
import { CommandResult } from '../lib/CommandResult';
import { CommandMessage } from '../lib/CommandMessage';
import { Bot } from '../Bot';
import { MessageEmbed, MessageReaction, ClientUser } from 'discord.js';
import { emojis } from '../lib/Emojis';
import { Question } from '../../Questions/Question';

export class Next implements Command {

    private question: Question;

    public readonly config = {

        name: 'Next',
        description: 'Get the next question.',
        command: 'next'

    };

    public constructor() {

    }

    public async handle(commandMessage: CommandMessage, bot: Bot): Promise<CommandResult> {

        const questions = await bot.botService.questionsService.getAll();

        this.question = questions[ 0 ];

        const embed = new MessageEmbed();

        embed.setTitle('Next question:');
        embed.setDescription(`${ this.question.question }\n \n:regional_indicator_t: **true** or :regional_indicator_f: **false**? \n \n`);

        embed.addFields([

            {

                name: 'Correct Answers',
                value: '3 / 123',
                inline: true

            }, {

                name: 'Tags',
                value: this.question.tags.map(tag => tag.name).join(', '),
                inline: true

            }

        ]);

        return {

            message: embed,
            reactions: [

                {

                    emoji: emojis.t,
                    handler: this.reacted

                }, {

                    emoji: emojis.f,
                    handler: this.reacted

                }

            ]

        };

    }

    public reacted(reaction: MessageReaction, user: ClientUser) {

        if (reaction.emoji.name === emojis.f && Boolean(this.question.options.find(option => option.isCorrect).option)) {

            const e = new MessageEmbed();

            e.setTitle('Correct answer guessed!');
            e.setDescription(`<@${ user.id }> guessed right :clap:`);

            reaction.message.reply(e);

        }

    }

}
