import * as mongoDB from "mongodb";
import {ConfigService} from "../config.service";

import { Logger } from "tslog";
import {IConfigInterface} from "../config.interface";

const logger = new Logger({ name: "DB" });
export const collections: { games?: mongoDB.Collection } = {}

export async function connectToDatabase(configService: IConfigInterface) {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(configService.get("DB_CONN_STRING"));
    await client.connect();

    const db: mongoDB.Db = client.db(configService.get("DB_NAME"));
    const gamesCollection: mongoDB.Collection = db.collection(configService.get("INVITE_COLLECTION_NAME"));

    collections.games = gamesCollection;
    logger.info("Connection to database is fine!");

    return client; // return the client
}
