import { CommandParsed } from './CommandParsed';

export const commandParse = (prefix: string, message: string): CommandParsed => {

    const matches = message.match(/\S+/g);

    if (matches) {

        return {

            name: matches[ 0 ].replace(prefix, ''),
            args: matches.slice(1)

        };

    }
    
};
