import { css } from '@emotion/react';

import { fp, mq } from 'lib/styles/utils';
import { COLOR } from '../../lib/styles/variables';

export const center = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const full = css({
  width: '100%',
});

export const textCenter = css({
  textAlign: 'center',
});

export const card = css(fp({
  maxWidth: ['50%', '100%'],
  margin: ['0 auto', 'initial'],
}));

export const container = css(fp({
  display: 'flex',
  flexDirection: ['column', 'row'],
}));

export const title = css({
  fontWeight: 'bold',
  fontSize: 22,
});

export const label = css({
  fontWeight: 'bold',
  marginRight: 4,
});

export const content = css({
  fontSize: 14,
  marginTop: 8,
});

export const leftPanel = css({
  [mq[1]]: {
    flexBasis: '35%',
  },
});

export const rightPanel = css({
  marginTop: 16,
  [mq[1]]: {
    marginTop: 'initial',
    marginLeft: 16,
    flexBasis: '65%',
  },
});

export const collectionBtn = css({
  marginTop: 12,
  width: '100%',
});

export const collection = css({
  position: 'relative',
  paddingLeft: 8,
  color: COLOR.B500,
  textDecoration: 'underline',

  ':first-child': {
    paddingLeft: 0,
  },

  '&:not(:last-child):after': {
    position: 'absolute',
    content: '" | "',
    paddingLeft: 2,
  },
});

export const addCollection = css({
  marginBottom: 24,
});

export const addInputContainer = css({
  display: 'flex',
});

export const addInputBtn = css({
  marginLeft: 12,
});

export const addCollectionBtn = css({
  width: '100%',
  fontSize: 12,
  fontWeight: 600,
  color: COLOR.B500,
  cursor: 'pointer',
});
