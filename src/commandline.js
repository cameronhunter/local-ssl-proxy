import commander from "commander";
import Path from "path";
import fs from "fs";
import { name, version } from "../package.json";

const exists = (path) => {
  fs.accessSync(absolutePath(path));
  return path;
};
const absolutePath = (path) => (Path.isAbsolute(path) ? path : Path.resolve(process.cwd(), path));
const parseInteger = (value) => parseInt(value, 10);

const program = commander
  .command(name)
  .version(version, "-v, --version", "show version number")
  .option("-n, --hostname <hostname>", "hostname for the server", "localhost")
  .option("-s, --source <source>", "source port for the server", parseInteger, 9001)
  .option("-t, --target <target>", "target port for the server", parseInteger, 9000)
  .option(
    "-c, --cert <cert>",
    "path to SSL certificate",
    exists,
    Path.resolve(__dirname, "..", "resources", "localhost.cert")
  )
  .option("-k, --key <key>", "path to SSL key", exists, Path.resolve(__dirname, "..", "resources", "localhost.key"))
  .option("-o, --config <config>", "path to configuration file", (path) => require(absolutePath(path)));

export default {
  parse: (args) => (args === undefined ? program.parse().opts() : program.parse(args, { from: "user" }).opts()),
};
