import { css } from '@emotion/react';

import { fp } from 'lib/styles/utils';
import { COLOR } from 'lib/styles/variables';

export const divider = css(fp({
  height: 1,
  width: '100%',
  background: COLOR.N900,
  margin: '24px 0',
}));

export const pagination = css({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const paginationBtn = css({
  padding: '0 16px',
  border: `1px solid ${COLOR.N200}`,
  borderRadius: 4,
});

export const paginationNextBtn = css({
  marginLeft: 16,
});
