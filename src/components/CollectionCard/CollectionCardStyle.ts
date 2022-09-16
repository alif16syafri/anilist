import { css } from '@emotion/react';

import { COLOR } from 'lib/styles/variables';
import { fp } from 'lib/styles/utils';

export const leftPanel = css({
  display: 'flex',
});

export const image = css({
  width: 40,
  marginRight: 16,
});

export const collection = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const name = css({
  fontWeight: 'bold',
  fontSize: 16,
});

export const totalCollections = css({
  fontSize: 12,
});

export const action = css({
  display: 'flex',
  fontSize: 12,
  fontWeight: 600,
});

export const actionSeparator = css({
  margin: '0 8px',
  height: '100%',
  width: 1,
  color: COLOR.N900,
});

export const actionEdit = css({
  color: COLOR.B500,
  cursor: 'pointer',
});

export const actionDelete = css({
  color: COLOR.R300,
  cursor: 'pointer',
});

export const divider = css(fp({
  height: 1,
  width: '100%',
  background: COLOR.N900,
  margin: '16px 0',
}));
