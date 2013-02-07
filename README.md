local-ssl-proxy
===============

Simple SSL HTTP proxy using a self-signed certificate. Intended for local development only.

Install
-------
```bash
git clone git://github.com/cameronhunter/local-ssl-proxy.git
cd local-ssl-proxy
npm install
```

Run
---
To start a proxy from port `9001` to `9000` run:
```bash
node proxy-server.js --source 9001 --target 9000
```
