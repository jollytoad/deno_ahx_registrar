import { byMethod } from "$http_fns/by_method.ts";
import { getBodyAsObject } from "$http_fns/request/body_as_object.ts";
import { fetchAugmentations, unregisterAugmentation } from "../lib/registry.ts";
import { notFound } from "$http_fns/response/not_found.ts";
import { badRequest } from "$http_fns/response/bad_request.ts";
import { plainError } from "$http_fns/response/plain_error.ts";
import { noContent } from "$http_fns/response/no_content.ts";
import { canRegister } from "../lib/permission.ts";
import { forbidden } from "$http_fns/response/forbidden.ts";

export default byMethod({
  POST: performUninstall,
});

interface ActionData {
  id?: string;
  augmentation?: string;
}

async function performUninstall(req: Request) {
  const registryUrl = Deno.env.get("REGISTRY_URL");

  if (!registryUrl) {
    console.warn("REGISTRY_URL env var not set!");
    throw notFound();
  }

  if (!await canRegister(req)) {
    return forbidden();
  }

  const { id, augmentation } = await getBodyAsObject<ActionData>(req);

  console.log(`Uninstalling addon: ${id}`);

  if (!augmentation) {
    return badRequest("No augmentation URL supplied");
  }

  const augmentations = await fetchAugmentations(registryUrl);
  const aug = augmentations.find(({ url }) => url === augmentation);

  if (!aug) {
    return notFound();
  }

  const response = await unregisterAugmentation(
    registryUrl,
    aug.id,
  );

  if (response.ok) {
    return noContent({ "AHX-Refresh": "true" });
  } else {
    console.error("UNINSTALL FAILED", response);
    return plainError(
      response.status,
      response.statusText,
      `Failed to unregister augmentation: ${augmentation}, for addon: ${id}`,
    );
  }
}
