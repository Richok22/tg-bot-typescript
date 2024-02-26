import { ConfigService } from './config/config.service';
import { IConfigInterface } from './config/config.interface';
import { Telegraf, session } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { Logger } from 'tslog';
import { connectToDatabase } from './config/db/config.db.service';
import { Command } from './commands/command.class';
import { StatsCommand } from './commands/stats.command';
import { MongoClient } from 'mongodb';
import {GuestsCommand} from "./commands/guests.command";
import {DeleteCommand} from "./commands/delete.command";
import {FindCommand} from "./commands/find.command";
import {ExportCommand} from "./commands/export.command";

const logger = new Logger({ name: 'APP' });




class Bot {
    bot: Telegraf<IBotContext>;
    commands: Command[] = [];


    constructor(private readonly configService: IConfigInterface) {
        this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'));
        this.bot.use(session());
    }

    async init() {
        try {
            const dbClient: MongoClient = await connectToDatabase(this.configService);
            if (!dbClient) {
                logger.error('Failed to connect to the database.');
                return;
            }
            // Assuming connectToDatabase handles the dbClient initialization

            this.commands = [new StatsCommand(this.bot, dbClient), new GuestsCommand(this.bot, dbClient),new DeleteCommand(this.bot, dbClient), new FindCommand(this.bot, dbClient),new ExportCommand(this.bot) ];
            for (const command of this.commands) {
                command.handle();
                logger.info('Commands loaded!');
            }

            await this.bot.launch();
            // Enable graceful stop
            process.once('SIGINT', () => this.bot.stop('SIGINT'));
            process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
        } catch (error) {
            logger.error(`Failed to start the bot: ${error}`);
        }
    }
}

(async () => {
    logger.info('Bot have been started!');
    const bot = new Bot(new ConfigService());
    await bot.init();
})();
