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
exports.StatsCommand = void 0;
const command_class_1 = require("./command.class");
class StatsCommand extends command_class_1.Command {
    constructor(bot, dbClient) {
        super(bot);
        this.dbClient = dbClient;
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.bot.command("stats", (ctx) => __awaiter(this, void 0, void 0, function* () {
                // Delete the command message
                yield ctx.deleteMessage();
                const collection = this.dbClient.db('test').collection('datas');
                const data = yield collection.find({}).toArray();
                const count = yield collection.countDocuments();
                const count18true = yield collection.countDocuments({ is18Checked: true });
                const count18false = yield collection.countDocuments({ is18Checked: false });
                const privacy = yield collection.countDocuments({ privacyChecked: false });
                ctx.reply(`🎉*Статистика приглашенный*🎉\n\n🚀 Было получено ответов: *${count}*\n\n✅ Из которых было положительных: *${count18true}*\n\n❌ Но были и отказы: *${count18false}*\n\n🚗Нужен будет транспорт: *${privacy}*`, { parse_mode: 'Markdown' });
            }));
        });
    }
}
exports.StatsCommand = StatsCommand;
