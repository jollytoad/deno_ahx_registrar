import { serve } from "$std/http/server.ts";
import { handle } from "$http_fns/handle.ts";
import { staticRoute } from "$http_fns/static.ts";
import { intercept } from "$http_fns/intercept.ts";
import {
  logError,
  logGroupEnd,
  logRequestGroup,
  logStatusAndContentType,
} from "$http_fns/logger.ts";
import routes from "@/routes.ts";

function main(port?: number) {
  return serve(
    intercept(
      handle([
        routes,
        staticRoute("/", import.meta.resolve("@/static")),
      ]),
      [logRequestGroup],
      [logGroupEnd, logStatusAndContentType],
      [logGroupEnd, logError],
    ),
    {
      port,
    },
  );
}

export default main;

if (import.meta.main) {
  await main();
}
