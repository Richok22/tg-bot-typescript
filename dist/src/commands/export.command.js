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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportCommand = void 0;
const command_class_1 = require("./command.class");
const axios_1 = __importDefault(require("axios"));
class ExportCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.bot.command("export", (ctx) => __awaiter(this, void 0, void 0, function* () {
                yield ctx.deleteMessage();
                ctx.reply('Ожидаем экспорт....');
                // Send a POST request to the webhook
                const webhookUrl = 'http://localhost:3000/export'; // replace with your webhook URL
                yield axios_1.default.post(webhookUrl, { chatId: ctx.chat.id });
                // Reply to the user
                ctx.reply('Ваши данные экспортированы!');
            }));
        });
    }
}
exports.ExportCommand = ExportCommand;
