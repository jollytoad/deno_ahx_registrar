# Augmented Hypermedia Reference Registrar (Addon)

This is an app that provides a registration service and addon for a marketplace.

It's purpose is to install and uninstall addons to a particular host app, and
supplied an augmentation to a marketplace app that injects appropriate actions
into the marketplace UI, such as Install/Uninstall buttons.

It's a TypeScript/JSX application that can run via
[Deno Runtime](https://deno.land/) or be easily deployed via
[Deno Deploy](https://deno.com/deploy).

The app should be used in conjunction with a _Augmented Hypermedia Registry_,
the URL for this is passed in the `REGISTRY_URL` environment variable.

## Local usage

You'll need to
[install Deno](https://deno.com/manual/getting_started/installation) first.

Then you can run this app locally using:

```sh
PORT=8100 REGISTRY_URL=http://localhost:8888/ref deno task start
```

## Deploying

This app is designed primarily to be deploy via
[Deno Deploy](https://deno.com/deploy), so you'll need to create an account on
there and obtain a token.

You'll need to set the `DENO_DEPLOY_TOKEN` env var, update the project name in
the `deploy` task within the `deno.json` file, and then run:

```sh
deno task deploy
```

This will deploy a staging version of the addon, which you'll need to promote to
production manually in the Deploy UI.

You'll also need to set `REGISTRY_URL` as an environment variable in the UI too.

## Registering the addon

The addon will need to be registered in an Augmented Hypermedia Registry.

For example: `http://localhost:8100/addon.css`
