export class BotConfig {

    public prefix = '?';

    public constructor() {

        this.prefix = process.env.PREFIX || '?';

    }

}
