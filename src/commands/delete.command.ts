import {Command} from "./command.class";
import {Telegraf} from "telegraf";
import {IBotContext} from "../../context/context.interface";
import { MongoClient } from 'mongodb';

function getEmojiChecked(isChecked:boolean) {
    return isChecked ? '✅' : '❌';
}

export class DeleteCommand extends Command{
    private dbClient: MongoClient;
    constructor(bot: Telegraf<IBotContext>, dbClient: MongoClient) {
        super(bot);
        this.dbClient = dbClient;
    }
    async handle(): Promise<void> {
        this.bot.command("delete", async (ctx) => {
            // delete the command message
            await ctx.deleteMessage();
            const collection = this.dbClient.db('test').collection('datas');
            const id = ctx.message.text.split(' ')[1]; // get the ID from the message
            const result = await collection.deleteOne({ID: id}); // delete the data with the given ID

            if (result.deletedCount > 0) {
                ctx.reply(`* Приглашение с ID ${id} успешно удалено.*`, { parse_mode: 'Markdown' });
            } else {
                ctx.reply(`❗ *Приглашения с таким ID нет.*`, { parse_mode: 'Markdown' });
            }
        });
    }
}

