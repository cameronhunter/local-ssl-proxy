#!/usr/bin/env node

import fs from 'fs';
import proxy from 'http-proxy';
import { red, bold, green } from 'ansi-colors';
import { isProxy, parse } from './lib';

const parsed = parse();

const config = isProxy(parsed) ? { proxy: parsed } : parsed;

for (const name of Object.keys(config)) {
  const { hostname, target, key, cert, source } = config[name]!;

  proxy
    .createServer({
      xfwd: true,
      ws: true,
      target: {
        host: hostname,
        port: target
      },
      ssl: {
        key: fs.readFileSync(key, 'utf8'),
        cert: fs.readFileSync(cert, 'utf8')
      }
    })
    .on('error', (e: any) => {
      console.error(red('Request failed to ' + name + ': ' + bold(e.code)));
    })
    .listen(source);

  console.log(
    green('Started ' + bold(name) + ': https://' + hostname + ':' + source + ' → http://' + hostname + ':' + target)
  );
}
