import { byMethod } from "$http_fns/method.ts";
import { getBodyAsObject } from "$http_fns/request.ts";
import { errorResponse, notFound, ok } from "$http_fns/response.ts";
import { fetchAugmentations, unregisterAugmentation } from "@/lib/registry.ts";

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

  const { id, augmentation } = await getBodyAsObject<ActionData>(req);

  console.log(`Uninstalling addon: ${id}`);

  if (!augmentation) {
    return errorResponse("No augmentation URL supplied");
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
    return ok(null, {
      "HX-Refresh": "true",
    });
  } else {
    console.error("UNINSTALL FAILED", response);
    return errorResponse(
      `Failed to unregister augmentation: ${augmentation}, for addon: ${id}`,
      response.status,
    );
  }
}
