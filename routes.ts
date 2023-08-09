// IMPORTANT: This file has been automatically generated, DO NOT edit by hand.

import { byPattern } from "$http_fns/pattern.ts";
import { cascade } from "$http_fns/cascade.ts";
import { lazy } from "$http_fns/lazy.ts";

export default cascade(
  byPattern("/uninstall", lazy(() => import("./routes/uninstall.ts"))),
  byPattern("/install", lazy(() => import("./routes/install.ts"))),
  byPattern("/actions", lazy(() => import("./routes/actions.tsx"))),
);
