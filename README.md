# local-ssl-proxy

[![CI](https://github.com/cameronhunter/prettier-package-json/actions/workflows/ci.yml/badge.svg)](https://github.com/cameronhunter/prettier-package-json/actions/workflows/ci.yml) [![NPM Version](https://img.shields.io/npm/v/local-ssl-proxy.svg)](https://npmjs.org/package/local-ssl-proxy) [![License](https://img.shields.io/npm/l/local-ssl-proxy.svg)](https://github.com/cameronhunter/local-ssl-proxy/blob/master/LICENSE.md)

Simple SSL HTTP proxy using a self-signed certificate. Intended for local development only.

## Quick Start

The package supports immediate use via [`npx`](https://docs.npmjs.com/cli/v7/commands/npx) or you can install it
globally.

Use via `npx`:

```sh
npx local-ssl-proxy
```

Install globally:

```sh
npm install -g local-ssl-proxy
```

## Usage

To start a proxy from port `9001` to `9000` run:

```sh
local-ssl-proxy --source 9001 --target 9000
```

Start your web server on the target port (`9000` in the example) and navigate to `https://localhost:<source-port>` ([https://localhost:9001](https://localhost:9001) in the example). You'll get a warning because the certificate is self-signed, this is safe to ignore during development.

Using a dynamic DNS provider such as [noip](http://www.noip.com/personal/) or [DynDNS](http://dyn.com/dns/) or a static IP (if you have one) you can open a port in your firewall to allow external sites to call into your web server. This is great for developing applications using [OAuth](http://oauth.net/) without having to deploy externally.

## Advanced

You can also pass a configuration file, this helps share setups with team members. These can contain multiple proxies that `local-ssl-proxy` will open concurrently.

Example config:

```json
{
  "My proxy": {
    "source": 3001,
    "target": 3000
  },
  "Another proxy": {
    "source": 9999,
    "target": 9000
  }
}
```

And run the proxy with the configuration file:

```sh
local-ssl-proxy --config config.json
```

## Run SSL proxy with a self-signed trusted certificate

You can use it to host any domain, just change localhost to anything you like, wildcards are also supported.

1. Install [mkcert](https://github.com/FiloSottile/mkcert) (`choco install mkcert` / `brew install mkcert`)
1. Run `mkcert -install`
1. Run `mkcert localhost`
1. Run

```sh
local-ssl-proxy --key localhost-key.pem --cert localhost.pem --source 9001 --target 9000
```

1. You're all set! Just go to https://localhost:9001 and see your project working!
