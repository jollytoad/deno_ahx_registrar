// deno-lint-ignore-file require-await

interface Props {
  reqURL?: string;
}

export async function asMainProps(req: Request): Promise<Props> {
  // Perform any async operations here

  // Build the props required by the page component
  return {
    reqURL: req.headers.get("AHX-Req-URL") || undefined,
  };
}

export function MainPage(_props: Props) {
  return (
    <article>
      I'm a full-page addon
    </article>
  );
}
