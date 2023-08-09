import { renderHTML } from "$http_render_fns/render_html.tsx";
import { byMethod } from "$http_fns/method.ts";
import { mapData } from "$http_fns/map.ts";
import { getSearchValues } from "$http_fns/request/search_values.ts";
import { notFound } from "$http_fns/response/not_found.ts";
import { fetchAugmentations } from "@/lib/registry.ts";

export default byMethod({
  GET: mapData(asActionProps, renderHTML(AddonActions)),
});

interface Props {
  addonId?: string;
  augmentation?: string;
  installed: boolean;
  reqURL?: URL | string;
}

async function asActionProps(req: Request): Promise<Props> {
  const registryUrl = Deno.env.get("REGISTRY_URL");

  if (!registryUrl) {
    console.warn("REGISTRY_URL env var not set!");
    throw notFound();
  }

  const getParam = getSearchValues(req);

  const [addonId] = getParam("id");
  const [augmentation] = getParam("augmentation");

  if (!addonId || !augmentation) {
    throw notFound();
  }

  const augmentations = await fetchAugmentations(registryUrl);
  const aug = augmentations.find(({ url }) => url === augmentation);
  const installed = !!aug?.enable;

  return {
    addonId,
    augmentation,
    installed,
    reqURL: req.headers.get("AHX-Req-URL") || undefined,
  };
}

function AddonActions({ installed, reqURL }: Props) {
  return (
    <>
      {installed
        ? (
          <button hx-post={`${reqURL}/uninstall`}>
            Uninstall
          </button>
        )
        : (
          <button hx-post={`${reqURL}/install`}>
            Install
          </button>
        )}
    </>
  );
}
