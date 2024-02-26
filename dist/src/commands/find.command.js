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
exports.FindCommand = void 0;
const command_class_1 = require("./command.class");
function getEmojiChecked(isChecked) {
    return isChecked ? '✅' : '❌';
}
class FindCommand extends command_class_1.Command {
    constructor(bot, dbClient) {
        super(bot);
        this.dbClient = dbClient;
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.bot.command("find", (ctx) => __awaiter(this, void 0, void 0, function* () {
                // delete the command message
                yield ctx.deleteMessage();
                const collection = this.dbClient.db('test').collection('datas');
                const id = ctx.message.text.split(' ')[1]; // get the ID from the message
                const data = yield collection.findOne({ ID: id }); // find the data with the given ID
                if (data) {
                    let message = `* Приглашение ${id} найдено:*\n\nИмя: *${data.username}*\n🤷Будет:*${getEmojiChecked(data.is18Checked)}* \n🚗 Нужен ли транспорт: *${getEmojiChecked(data.privacyChecked)}*\n💻 ID:*${data.ID}* \n\n `;
                    ctx.reply(message, { parse_mode: 'Markdown' });
                }
                else {
                    ctx.reply(`❗ *Приглашения с таким ID нет.*`, { parse_mode: 'Markdown' });
                }
            }));
        });
    }
}
exports.FindCommand = FindCommand;
