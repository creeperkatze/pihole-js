import test from 'node:test';
import assert from 'node:assert/strict';

import { domainRegex, domainsPath, encodeSegment } from '../../src/utils/domain.ts';

test('domainRegex escapes dots and matches subdomains', () => {
  assert.equal(domainRegex('pi.hole'), '(^|\\.)(pi\\.hole)$');
});

test('encodeSegment encodes reserved path characters', () => {
  assert.equal(encodeSegment('group/a b'), 'group%2Fa%20b');
});

test('domainsPath returns the bare collection path by default', () => {
  assert.equal(domainsPath(), 'domains');
});

test('domainsPath prefers an explicit custom path', () => {
  assert.equal(domainsPath({ path: '/regex/allow' }), 'domains/regex/allow');
});

test('domainsPath builds typed paths and encodes the domain value', () => {
  assert.equal(
    domainsPath({
      type: 'allow',
      kind: 'exact',
      domain: 'pi.hole/test',
    }),
    'domains/allow/exact/pi.hole%2Ftest',
  );
});
