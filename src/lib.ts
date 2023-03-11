import { createCommand } from 'commander';
import { resolve, isAbsolute } from 'path';
import * as fs from 'fs';

const { name, version } = require('../package.json');

const exists = (path: string) => {
  fs.accessSync(absolutePath(path));
  return path;
};

const absolutePath = (path: string) => (isAbsolute(path) ? path : resolve(process.cwd(), path));
const parseInteger = (value: string) => parseInt(value, 10);

const program = createCommand(name)
  .version(version, '-v, --version', 'show version number')
  .option('-n, --hostname <hostname>', 'hostname for the server', 'localhost')
  .option('-s, --source <source>', 'source port for the server', parseInteger, 9001)
  .option('-t, --target <target>', 'target port for the server', parseInteger, 9000)
  .option(
    '-c, --cert <cert>',
    'path to SSL certificate',
    exists,
    resolve(__dirname, '..', 'resources', 'localhost.crt')
  )
  .option('-k, --key <key>', 'path to SSL key', exists, resolve(__dirname, '..', 'resources', 'localhost.key'))
  .option('-o, --config <config>', 'path to configuration file', (path) => require(absolutePath(path)));

type Proxy = {
  hostname: string;
  source: number;
  target: number;
  cert: string;
  key: string;
};

type Config = { config: Record<string, Proxy> };
type ParsedArguments = Proxy | Config;

function isConfig(args: unknown): args is Config {
  return Boolean(args && typeof args === 'object' && 'config' in args);
}

export function isProxy(input: unknown): input is Proxy {
  return Boolean(
    input &&
      typeof input === 'object' &&
      'hostname' in input &&
      typeof input.hostname === 'string' &&
      'source' in input &&
      typeof input.source === 'number' &&
      'target' in input &&
      typeof input.target === 'number' &&
      'cert' in input &&
      typeof input.cert === 'string' &&
      'key' in input &&
      typeof input.key === 'string'
  );
}

export function parse(args?: string[]): Proxy | Record<string, Proxy> {
  const proxy: ParsedArguments =
    args === undefined ? program.parse().opts() : program.parse(args, { from: 'user' }).opts();

  return isConfig(proxy) ? proxy.config : proxy;
}
