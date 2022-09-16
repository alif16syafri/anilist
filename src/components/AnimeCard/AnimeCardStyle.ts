import { css } from '@emotion/react';

import { COLOR } from 'lib/styles/variables';

export const title = css(({
  textAlign: 'center',
  fontWeight: 'bold',
  marginTop: 8,
}));

export const actionDelete = css(({
  textAlign: 'center',
  color: COLOR.R300,
  fontSize: 12,
  fontWeight: 600,
  cursor: 'pointer',
}));
