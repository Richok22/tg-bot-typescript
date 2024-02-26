import {Context} from "telegraf";

export interface SessionData {
    manyInvites: string;
}

export interface IBotContext extends Context {
    session: SessionData
}
