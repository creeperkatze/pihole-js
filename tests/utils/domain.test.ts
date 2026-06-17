import { test, expect } from 'vitest';

import { encodeSegment } from '../../src/utils/domain.ts';

test('encodeSegment encodes reserved path characters', () => {
  expect(encodeSegment('group/a b')).toBe('group%2Fa%20b');
});
