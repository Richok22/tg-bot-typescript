"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_service_1 = require("./config/config.service");
const telegraf_1 = require("telegraf");
const tslog_1 = require("tslog");
const config_db_service_1 = require("./config/db/config.db.service");
const stats_command_1 = require("./commands/stats.command");
const guests_command_1 = require("./commands/guests.command");
const delete_command_1 = require("./commands/delete.command");
const find_command_1 = require("./commands/find.command");
const export_command_1 = require("./commands/export.command");
const logger = new tslog_1.Logger({ name: 'APP' });
class Bot {
    constructor(configService) {
        this.configService = configService;
        this.commands = [];
        this.bot = new telegraf_1.Telegraf(this.configService.get('TOKEN'));
        this.bot.use((0, telegraf_1.session)());
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbClient = yield (0, config_db_service_1.connectToDatabase)(this.configService);
                if (!dbClient) {
                    logger.error('Failed to connect to the database.');
                    return;
                }
                // Assuming connectToDatabase handles the dbClient initialization
                this.commands = [new stats_command_1.StatsCommand(this.bot, dbClient), new guests_command_1.GuestsCommand(this.bot, dbClient), new delete_command_1.DeleteCommand(this.bot, dbClient), new find_command_1.FindCommand(this.bot, dbClient), new export_command_1.ExportCommand(this.bot)];
                for (const command of this.commands) {
                    command.handle();
                    logger.info('Commands loaded!');
                }
                yield this.bot.launch();
                // Enable graceful stop
                process.once('SIGINT', () => this.bot.stop('SIGINT'));
                process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
            }
            catch (error) {
                logger.error(`Failed to start the bot: ${error}`);
            }
        });
    }
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    logger.info('Bot have been started!');
    const bot = new Bot(new config_service_1.ConfigService());
    yield bot.init();
}))();
