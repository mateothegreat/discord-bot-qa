import { CommandConfig } from './CommandConfig';
import { CommandConfigArgumentType } from './CommandConfigArgumentType';

export const commandArgumentsTransformer = (config: CommandConfig, args: Array<string>): Array<string | number> => {

    const ret: Array<string | number> = [];

    for (let i = 0; i < args.length; i++) {

        if (config.arguments[ i ].type === CommandConfigArgumentType.NUMBER) {

            ret.push(Number(args[ i ]));

        } else {

            ret.push(args[ i ]);

        }

    }

    return ret;

};
