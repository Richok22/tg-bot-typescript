import {Command} from "./command.class";
import {Telegraf} from "telegraf";
import {IBotContext} from "../../context/context.interface";
import { MongoClient } from 'mongodb';

export class StatsCommand extends Command{
    private dbClient: MongoClient;
    constructor(bot: Telegraf<IBotContext>, dbClient: MongoClient) {
        super(bot);
        this.dbClient = dbClient;
    }
    async handle(): Promise<void> {
        this.bot.command("stats",async (ctx) => {
            // Delete the command message
            await ctx.deleteMessage();

            const collection = this.dbClient.db('test').collection('datas');
            const data = await collection.find({}).toArray();
            const count = await collection.countDocuments();
            const count18true = await collection.countDocuments({ is18Checked: true });
            const count18false = await collection.countDocuments({ is18Checked: false });
            const privacy = await collection.countDocuments({ privacyChecked: false });
            ctx.reply(`🎉*Статистика приглашенный*🎉\n\n🚀 Было получено ответов: *${count}*\n\n✅ Из которых было положительных: *${count18true}*\n\n❌ Но были и отказы: *${count18false}*\n\n🚗Нужен будет транспорт: *${privacy}*`, { parse_mode: 'Markdown' })
        });


    }
}

