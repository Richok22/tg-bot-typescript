"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv_1 = require("dotenv");
const tslog_1 = require("tslog");
const logger = new tslog_1.Logger({ name: "CONFIG" });
class ConfigService {
    constructor() {
        const { error, parsed } = (0, dotenv_1.config)();
        if (error) {
            logger.error("There is no ENV file!");
        }
        if (!parsed) {
            logger.error("Theres nothing in env file");
            throw new Error("Theres nothing in env file");
        }
        this.config = parsed;
    }
    get(key) {
        const res = this.config[key];
        if (!res) {
            logger.error("There is no key " + key);
        }
        return res;
    }
}
exports.ConfigService = ConfigService;
