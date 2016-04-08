import test from 'ava';
import fs from 'fs';
import commandline from '../dist/commandline';

test('cert (default)', t => {
  const { cert } = commandline.parse([]);
  t.truthy(cert);
});

test('cert', t => {
  const { cert } = commandline.parse(['--cert', '../resources/localhost.cert']);
  t.truthy(cert);
});

test('key (default)', t => {
  const { key } = commandline.parse([]);
  t.truthy(key);
});

test('key', t => {
  const { key } = commandline.parse(['--key', '../resources/localhost.key']);
  t.truthy(key);
});

test('hostname (default)', t => {
  const { hostname } = commandline.parse([]);
  t.is(hostname, 'localhost');
});

test('hostname', t => {
  const { hostname } = commandline.parse(['--hostname', '127.0.0.1']);
  t.is(hostname, '127.0.0.1');
});

test('source (default)', t => {
  const { source } = commandline.parse([]);
  t.is(source, 9001);
});

test('source', t => {
  const { source } = commandline.parse(['--source', '5001']);
  t.is(source, 5001);
});

test('target (default)', t => {
  const { target } = commandline.parse([]);
  t.is(target, 9000);
});

test('target', t => {
  const { target } = commandline.parse(['--target', '5000']);
  t.is(target, 5000);
});

test('config', t => {
  const { config } = commandline.parse(['--config', './test-config.json']);
  t.truthy(config);
});
