import gen from "./gen.ts";
import main from "./main.ts";
import { port } from "$http_fns/port.ts";

await gen();
await main(port());
