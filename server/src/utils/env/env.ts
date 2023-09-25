import { config } from "dotenv";
import { zEnv } from "./env.z.js";

const raw = config().parsed ?? process.env;
const validation = zEnv.safeParse(raw);

if (!validation.success) {
    console.error(validation.error.message);
    process.exit(1);
}
const { data } = validation;

export default data;