// deno-lint-ignore require-await
export async function canRegister(req: Request) {
  try {
    if (Deno.env.get("ANON_EDIT") === "true") {
      return true;
    }

    const registryToken = Deno.env.get("REGISTRY_TOKEN");

    if (registryToken) {
      const permittedDomain = Deno.env.get("ADMIN_EMAIL_DOMAIN")?.toLowerCase();

      if (!permittedDomain) {
        return true;
      }

      const userEmail = req.headers.get("X-Gitlab-User-Email");
      const [, userDomain] = userEmail?.split("@") ?? [];

      console.log(permittedDomain, userDomain);

      if (userDomain?.toLowerCase() === permittedDomain) {
        return true;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return false;
}

export function registryAuthHeaders(): Record<string, string> {
  try {
    const registryToken = Deno.env.get("REGISTRY_TOKEN");

    if (registryToken) {
      return {
        "Authorization": `Bearer ${registryToken}`,
      };
    }
  } catch (e) {
    console.error(e);
  }
  return {};
}
