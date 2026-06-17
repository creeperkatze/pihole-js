import test from 'node:test';
import assert from 'node:assert/strict';

import { encodeSegment } from '../../src/utils/domain.ts';

test('encodeSegment encodes reserved path characters', () => {
  assert.equal(encodeSegment('group/a b'), 'group%2Fa%20b');
});
