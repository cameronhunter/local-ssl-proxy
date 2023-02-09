import commander from "commander";
import fs from "fs";
import path from "path";
import process from "process";
import { name, version } from "../package.json";

const exists = (p) => {
  fs.accessSync(absolutePath(p));
  return p;
};
const absolutePath = (p) => (path.isAbsolute(p) ? p : path.resolve(process.cwd(), p));
const parseInteger = (v) => parseInt(v, 10);

const program = commander
  .command(name)
  .version(version, "-v, --version", "show version number")
  .option("-n, --hostname <hostname>", "hostname for the server", "localhost")
  .option("-s, --source <source>", "source port for the server", parseInteger, 9001)
  .option("-t, --target <target>", "target port for the server", parseInteger, 9000)
  .option("-c, --cert <cert>", "path to SSL certificate", exists, path.resolve(__dirname, "..", "resources", "localhost.cert"))
  .option("-k, --key <key>", "path to SSL key", exists, path.resolve(__dirname, "..", "resources", "localhost.key"))
  .option("-o, --config <config>", "path to configuration file", (p) => require(absolutePath(p)));

export default {
  parse: (args) => (args === undefined ? program.parse().opts() : program.parse(args, { from: "user" }).opts())
};
