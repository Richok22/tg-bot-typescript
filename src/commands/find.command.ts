import {Command} from "./command.class";
import {Telegraf} from "telegraf";
import {IBotContext} from "../../context/context.interface";
import { MongoClient } from 'mongodb';

function getEmojiChecked(isChecked:boolean) {
    return isChecked ? '✅' : '❌';
}

export class FindCommand extends Command{
    private dbClient: MongoClient;
    constructor(bot: Telegraf<IBotContext>, dbClient: MongoClient) {
        super(bot);
        this.dbClient = dbClient;
    }
    async handle(): Promise<void> {
        this.bot.command("find", async (ctx) => {
            // delete the command message
            await ctx.deleteMessage();
            const collection = this.dbClient.db('test').collection('datas');
            const id = ctx.message.text.split(' ')[1]; // get the ID from the message
            const data = await collection.findOne({ID: id}); // find the data with the given ID

            if (data) {
                let message = `* Приглашение ${id} найдено:*\n\nИмя: *${data.username}*\n🤷Будет:*${getEmojiChecked(data.is18Checked)}* \n🚗 Нужен ли транспорт: *${getEmojiChecked(data.privacyChecked)}*\n💻 ID:*${data.ID}* \n\n `;
                ctx.reply(message, { parse_mode: 'Markdown' });
            } else {
                ctx.reply(`❗ *Приглашения с таким ID нет.*`, { parse_mode: 'Markdown' });
            }
        });
    }
}

