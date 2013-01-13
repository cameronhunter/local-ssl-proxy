#!/usr/bin/env node

var fs = require('fs'),
    path = require('path'),
    proxy = require('http-proxy'),
    optimist = require('optimist');

var commandline = optimist.
                    usage('Usage: $0 --source [port] --target [port]').
                    alias({'s':'source', 't':'target', 'h':'help'}).
                    default({s: 9001, t: 9000});

var args = commandline.argv;

if ( args.h ) {
  console.error( commandline.help() );
  return;
}

proxy.createServer(args.target, 'localhost', {
  https: {
    key: fs.readFileSync(path.resolve(__dirname, 'localhost.key'), 'utf8'),
    cert: fs.readFileSync(path.resolve(__dirname, 'localhost.cert'), 'utf8')
  }
}).listen(args.source);

console.info('Proxying requests from https://localhost:' + args.source, '→ http://localhost:' + args.target);
