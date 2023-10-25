import { byMethod } from "$http_fns/method.ts";
import { getBodyAsObject } from "$http_fns/request/body_as_object.ts";
import { registerAugmentation } from "../lib/registry.ts";
import { notFound } from "$http_fns/response/not_found.ts";
import { badRequest } from "$http_fns/response/bad_request.ts";
import { noContent } from "$http_fns/response/no_content.ts";
import { plainError } from "$http_fns/response/plain_error.ts";
import { forbidden } from "$http_fns/response/forbidden.ts";
import { canRegister } from "../lib/permission.ts";

export default byMethod({
  POST: performInstall,
});

interface ActionData {
  id?: string;
  augmentation?: string;
}

async function performInstall(req: Request) {
  const registryUrl = Deno.env.get("REGISTRY_URL");

  if (!registryUrl) {
    console.warn("REGISTRY_URL env var not set!");
    throw notFound();
  }

  if (!await canRegister(req)) {
    return forbidden();
  }

  const { id, augmentation } = await getBodyAsObject<ActionData>(req);

  console.log(`Installing addon: ${id}`);

  if (!augmentation) {
    return badRequest("No augmentation URL supplied");
  }

  const response = await registerAugmentation(
    registryUrl,
    augmentation,
  );

  if (response.ok) {
    return noContent({ "AHX-Refresh": "true" });
  } else {
    console.error("INSTALL FAILED", response);
    return plainError(
      response.status,
      response.statusText,
      `Failed to register augmentation: ${augmentation}, for addon: ${id}`,
    );
  }
}
