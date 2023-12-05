import { generateRoutesModule } from "$http_fns/generate_routes_module.ts";

function generateRoutes() {
  console.debug("Generating routes");

  return generateRoutesModule({
    fileRootUrl: import.meta.resolve("../routes"),
    moduleOutUrl: import.meta.resolve("../routes.ts"),
    httpFns: "$http_fns/",
    verbose: true,
  });
}

export default generateRoutes;

if (import.meta.main) {
  await generateRoutes();
}
