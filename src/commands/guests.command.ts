import {Command} from "./command.class";
import {Telegraf} from "telegraf";
import {IBotContext} from "../../context/context.interface";
import { MongoClient } from 'mongodb';

function getEmojiChecked(isChecked:boolean) {
    return isChecked ? '✅' : '❌';
}

export class GuestsCommand extends Command{
    private dbClient: MongoClient;
    constructor(bot: Telegraf<IBotContext>, dbClient: MongoClient) {
        super(bot);
        this.dbClient = dbClient;
    }
    async handle(): Promise<void> {
        this.bot.command("guests",async (ctx) => {
            // delete the command message
            await ctx.deleteMessage();
            const collection = this.dbClient.db('test').collection('datas');
            const data = await collection.find({}).toArray();

            let message = '*❗ Список приглашенный:*\n\n';
            data.forEach((item, index) => {
                message += `👀Имя: *${item.username}*\n🤷Будет:*${getEmojiChecked(item.is18Checked)}* \n🚗 Нужен ли транспорт: *${getEmojiChecked(item.privacyChecked)}*\n💻 ID:*${item.ID}* \n\n\n `;
            });

            ctx.reply(message, { parse_mode: 'Markdown' });
        });
    }
}

