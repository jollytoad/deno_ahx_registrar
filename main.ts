import { serve } from "$std/http/server.ts";
import { intercept } from "$http_fns/intercept.ts";
import {
  logError,
  logGroupEnd,
  logRequestGroup,
  logStatusAndContentType,
} from "$http_fns/logger.ts";
import handler from "./handler.ts";

function main(port?: number) {
  return serve(
    intercept(
      handler,
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
