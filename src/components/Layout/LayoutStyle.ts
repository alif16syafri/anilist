import { css } from '@emotion/react';

import { COLOR } from 'lib/styles/variables';
import { mq, breakpoints } from 'lib/styles/utils';

export const layout = css({
  background: COLOR.primary,
  minHeight: '100vh',
  color: COLOR.N0,
});

export const header = css({
  position: 'fixed',
  zIndex: 10,
  width: '100%',
  height: 64,
  background: COLOR.primary,
  color: COLOR.N0,
  display: 'flex',
  alignItems: 'center',
  padding: '0 24px',
  fontWeight: 'bold',
  borderBottom: `1px solid ${COLOR.N900}`
});

export const logo = css({
  borderRight: `1px solid ${COLOR.N900}`,
  height: '100%',
  paddingRight: 24,
  display: 'flex',
  alignItems: 'center',
});

export const main = css({
  paddingTop: 24 + 64,
  paddingLeft: '16px',
  paddingRight: '16px',
  paddingBottom: '16px',
  [mq[2]]: {
    maxWidth: breakpoints[1],
    margin: '0 auto',
    paddingLeft: 0,
    paddingRight: 0,
  },
})
