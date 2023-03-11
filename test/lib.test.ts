import { parse } from '../src/lib';

test('cert (default)', () => {
  const { cert } = parse([]);
  expect(cert).toEqual(expect.any(String));
});

test('cert', () => {
  const { cert } = parse(['--cert', require.resolve('../resources/localhost.crt')]);
  expect(cert).toEqual(expect.any(String));
});

test('key (default)', () => {
  const { key } = parse([]);
  expect(key).toEqual(expect.any(String));
});

test('key', () => {
  const { key } = parse(['--key', require.resolve('../resources/localhost.key')]);
  expect(key).toEqual(expect.any(String));
});

test('hostname (default)', () => {
  const { hostname } = parse([]);
  expect(hostname).toBe('localhost');
});

test('hostname', () => {
  const { hostname } = parse(['--hostname', '127.0.0.1']);
  expect(hostname).toBe('127.0.0.1');
});

test('source (default)', () => {
  const { source } = parse([]);
  expect(source).toBe(9001);
});

test('source', () => {
  const { source } = parse(['--source', '5001']);
  expect(source).toBe(5001);
});

test('target (default)', () => {
  const { target } = parse([]);
  expect(target).toBe(9000);
});

test('target', () => {
  const { target } = parse(['--target', '5000']);
  expect(target).toBe(5000);
});

test('config', () => {
  const config = parse(['--config', require.resolve('./test-config.json')]);
  expect(config).toMatchInlineSnapshot(`
{
  "Proxy 1": {
    "cert": "/etc/apache2/server.pem",
    "hostname": "localhost",
    "key": "/etc/apache2/server.key",
    "source": 443,
    "target": 1867,
  },
  "Proxy 2": {
    "cert": "/etc/apache2/server.pem",
    "hostname": "localhost",
    "key": "/etc/apache2/server.key",
    "source": 5001,
    "target": 3001,
  },
}
`);
});
