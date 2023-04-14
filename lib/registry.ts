export interface Augmentation {
  id: string;
  url: string;
  enable: boolean;
}

export async function fetchAugmentations(
  registryURL: string,
): Promise<Augmentation[]> {
  const url = `${registryURL}/-/index.json`;
  try {
    const response = await fetch(url);
    const { augmentations } = await response.json() as {
      augmentations: Augmentation[];
    };
    return augmentations ?? [];
  } catch (e) {
    console.error(`Failed to fetch augmentations from registry: ${url}`, e);
    return [];
  }
}

export function registerAugmentation(
  registryURL: string,
  reqURL: string,
): Promise<Response> {
  return fetch(registryURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: reqURL,
      enable: true,
    }),
  });
}

export function unregisterAugmentation(
  registryURL: string,
  augId: string,
): Promise<Response> {
  return fetch(`${registryURL}/-/aug/${augId}`, {
    method: "DELETE",
  });
}
