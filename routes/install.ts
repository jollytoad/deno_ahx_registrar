import { byMethod } from "$http_fns/method.ts";
import { getBodyAsObject } from "$http_fns/request.ts";
import { errorResponse, notFound, ok } from "$http_fns/response.ts";
import { registerAugmentation } from "@/lib/registry.ts";

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

  const { id, augmentation } = await getBodyAsObject<ActionData>(req);

  console.log(`Installing addon: ${id}`);

  if (!augmentation) {
    return errorResponse("No augmentation URL supplied");
  }

  const response = await registerAugmentation(
    registryUrl,
    augmentation,
  );

  if (response.ok) {
    return ok(null, {
      "HX-Refresh": "true",
    });
  } else {
    console.error("INSTALL FAILED", response);
    return errorResponse(
      `Failed to register augmentation: ${augmentation}, for addon: ${id}`,
      response.status,
    );
  }
}
