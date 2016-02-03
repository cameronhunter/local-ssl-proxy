import nomnom from 'nomnom';
import Path from 'path';
import fs from 'fs';
import { name, version } from '../package.json';

const exists = path => fs.accessSync(absolutePath(path));
const absolutePath = path => Path.isAbsolute(path) ? path : Path.resolve(process.cwd(), path);

const options = {
  hostname: {
    abbr: 'n',
    default: 'localhost'
  },
  source: {
    abbr: 's',
    default: 9001
  },
  target: {
    abbr: 't',
    default: 9000
  },
  cert: {
    abbr: 'c',
    default: Path.resolve(__dirname, '..', 'resources', 'localhost.cert'),
    callback: exists
  },
  key: {
    abbr: 'k',
    default: Path.resolve(__dirname, '..', 'resources', 'localhost.key'),
    callback: exists
  },
  config: {
    abbr: 'o',
    callback: exists,
    transform: path => require(absolutePath(path))
  },
  version: {
    abbr: 'v',
    flag: true,
    callback: () => version
  }
};

export default nomnom.script(name).options(options);
