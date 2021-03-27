import * as dotenv from 'dotenv';
import { AppModule } from './AppModule';
import { Server } from '@nestjs.pro/common/dist/server/Server';

dotenv.config();

const serverUrls = [];

serverUrls.push('https://api.tco.ai');

if (Server.getEnvironment() === 'local') {

    serverUrls.push(`http://localhost:${ process.env.PORT }`);

} else if (Server.getEnvironment() === 'docker') {

    serverUrls.push('http://localhost:18080');

}

Server.bootstrap(AppModule, 'qa', Number(process.env.PORT) || 10093, {

    path: '/swagger',
    title: 'QA bot API',
    description: 'QA bot Management API',
    version: '0.0.1',
    tags: [],
    contactName: 'Matthew Davis',
    contactEmail: 'support@tco.ai',
    contactUrl: 'https://tco.ai',
    docsDescription: 'docs',
    docsUrl: 'https://tco.ai',
    serverUrls

}, [

    'https://app.tco.ai',
    'http://localhost:4200'

], []);
