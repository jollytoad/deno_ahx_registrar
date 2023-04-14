// IMPORTANT: This file has been automatically generated, DO NOT edit by hand.

import { byPattern } from "$http_fns/pattern.ts";
import { cascade } from "$http_fns/cascade.ts";
import route_1 from "./routes/uninstall.ts";
import route_2 from "./routes/install.ts";
import route_3 from "./routes/actions.tsx";

export default cascade(
  byPattern("/uninstall", route_1),
  byPattern("/install", route_2),
  byPattern("/actions", route_3),
);
