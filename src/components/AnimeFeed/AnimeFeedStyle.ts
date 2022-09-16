import { css } from '@emotion/react';

import { fp } from 'lib/styles/utils';

export const grid = css(fp({
  display: 'grid',
  gridTemplateColumns: ['repeat(2,minmax(0,1fr))', 'repeat(3,minmax(0,1fr))', 'repeat(4,minmax(0,1fr))'],
  gap: '1rem',
}));
