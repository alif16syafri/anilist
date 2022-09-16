import { css } from '@emotion/react';

import { COLOR } from 'lib/styles/variables';

import { ImageVariant } from './Image';

export const imageContainer = css(({
  height: 0,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: 8,
}));

export const image = css(({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: COLOR.N800,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const getVariant = (variant: ImageVariant) => css({
  paddingTop: variant === 'square' ? '100%' : '133%',
});
