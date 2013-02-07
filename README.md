local-ssl-proxy
===============

Simple SSL HTTP proxy using a self-signed certificate. Intended for local development only.

Install
-------
```sh
git clone git://github.com/cameronhunter/local-ssl-proxy.git
cd local-ssl-proxy
npm install
```

Run
---
To start a proxy from port `9001` to `9000` run:
```sh
node proxy-server.js --source 9001 --target 9000
```

You'll get a warning when you navigate to https://localhost:9001 because the certificate is self-signed. This is fine during development.

Using a dynamic DNS provider such as [noip](http://www.noip.com/personal/) or [DynDNS](http://dyn.com/dns/) or a static IP (if you have one) you can open a port in your firewall to allow external sites to call into your web server. This is great for developing applications using [OAuth](http://oauth.net/) without having to deploy externally.
