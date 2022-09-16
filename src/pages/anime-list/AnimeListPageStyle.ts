import { css } from '@emotion/react';

import { fp } from 'lib/styles/utils';
import { COLOR } from '../../lib/styles/variables';

export const center = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const divider = css(fp({
  height: 1,
  width: '100%',
  background: COLOR.N900,
  margin: '24px 0',
}));
