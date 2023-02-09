import { expect, test } from "vitest";
import commandline from "../dist/commandline.js";

test("cert (default)", () => {
  const { cert } = commandline.parse([]);
  expect(cert).toBeTruthy();
});

test("cert", () => {
  const { cert } = commandline.parse(["--cert", "./resources/localhost.cert"]);
  expect(cert).toBeTruthy();
});

test("key (default)", () => {
  const { key } = commandline.parse([]);
  expect(key).toBeTruthy();
});

test("key", () => {
  const { key } = commandline.parse(["--key", "./resources/localhost.key"]);
  expect(key).toBeTruthy();
});

test("hostname (default)", () => {
  const { hostname } = commandline.parse([]);
  expect(hostname).toStrictEqual("localhost");
});

test("hostname", () => {
  const { hostname } = commandline.parse(["--hostname", "127.0.0.1"]);
  expect(hostname).toStrictEqual("127.0.0.1");
});

test("source (default)", () => {
  const { source } = commandline.parse([]);
  expect(source).toStrictEqual(9001);
});

test("source", () => {
  const { source } = commandline.parse(["--source", "5001"]);
  expect(source).toStrictEqual(5001);
});

test("target (default)", () => {
  const { target } = commandline.parse([]);
  expect(target).toStrictEqual(9000);
});

test("target", () => {
  const { target } = commandline.parse(["--target", "5000"]);
  expect(target).toStrictEqual(5000);
});

test("config", () => {
  const { config } = commandline.parse(["--config", "./test/test-config.json"]);
  expect(config).toBeTruthy();
});
