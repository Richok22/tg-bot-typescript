import {IConfigInterface} from "./config.interface";
import {config, DotenvParseOutput} from "dotenv";
import { Logger } from "tslog";

const logger = new Logger({ name: "CONFIG" });

export class ConfigService implements IConfigInterface{
    private config: DotenvParseOutput;
    constructor() {
        const {error, parsed} = config();
        if(error) {
            logger.error("There is no ENV file!")
        }
        if (!parsed) {
            logger.error("Theres nothing in env file")
            throw new Error("Theres nothing in env file");
        }
        this.config = parsed;
    }
    get(key:string):string {
        const res = this.config[key];
        if(!res) {
            logger.error("There is no key " + key)
        }
        return res;
    }
}
