import {Command} from "./command.class";
import {Telegraf} from "telegraf";
import {IBotContext} from "../../context/context.interface";
import { MongoClient } from 'mongodb';
import axios from "axios";


export class ExportCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    async handle(): Promise<void> {
        this.bot.command("export", async (ctx) => {
            await ctx.deleteMessage();

            ctx.reply('Ожидаем экспорт....')
            // Send a POST request to the webhook
            const webhookUrl = 'http://localhost:3000/export'; // replace with your webhook URL
            await axios.post(webhookUrl, { chatId: ctx.chat.id });

            // Reply to the user
            ctx.reply('Ваши данные экспортированы!');
        });
    }
}
