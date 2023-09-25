import { App } from "./app/application.js";
import { List } from "./controller/list.action.js";
import { Read } from "./controller/read.action.js";
import { Create } from "./controller/create.action.js";
import { Update } from "./controller/update.action.js";
import { Delete } from "./controller/delete.action.js";

import { HTTP, HttpModule } from "./utils/http.js";

const app = new App(
    "cars",
    "Simple CLI tool for testing the cars API",
    {
        host: "localhost",
        port: 5050
    }
);
const modules = [
    Create,
    List,
    Read,
    Update,
    Delete
];
app.provide(HTTP, HttpModule);
app.attachAll(modules);
app.defaultHelp();