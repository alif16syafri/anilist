import { css } from '@emotion/react';

import { fp } from 'lib/styles/utils';
import { COLOR } from 'lib/styles/variables';
import { breakpoints } from 'lib/styles/utils';

export const container = css({
  position: 'relative',
  color: COLOR.N0,
});

export const overlay = css({
  zIndex: 500,
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  background: COLOR.N900,
  opacity: 0.75,
  transitionProperty: 'opacity',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '150ms',
});

export const innerContainer = css({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: 500,
  overflowY: 'auto',
});

export const modalPosition = css(fp({
  display: 'flex',
  alignItems: ['flex-start', 'center'],
  justifyContent: 'center',
  minHeight: '100%',
  padding: [16, 0],
}));

export const modal = css(fp({
  position: 'relative',
  background: COLOR.primary,
  borderRadius: 8,
  textAlign: 'left',
  overflow: 'hidden',
  maxWidth: breakpoints[0],
  width: '100%',
}));

export const title = css(fp({
  padding: [12, 16],
  fontSize: [16, 18],
  fontWeight: 600,
  textAlign: 'center',
  borderBottom: `1px solid ${COLOR.N900}`,
}));

export const body = css(fp({
  padding: 16,
  fontSize: [14, 16],
  display: 'flex',
  justifyContent: 'center'
}));

export const footer = css(fp({
  padding: ['12px 16px'],
  display: 'flex',
  flexDirection: 'row-reverse',
  borderTop: `1px solid ${COLOR.N900}`,
}));

export const primaryBtn = css(fp({
  marginLeft: 12,
}));
