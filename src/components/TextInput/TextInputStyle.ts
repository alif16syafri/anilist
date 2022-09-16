import { css } from '@emotion/react';

import { COLOR } from 'lib/styles/variables';

export const textInput = css({
  width: '100%',
  border: `2px solid ${COLOR.N900}`,
  borderRadius: 4,
  height: 40,
  padding: '0 8px',
  color: COLOR.N100,
  background: 'transparent',
  outline: 'none',
  fontSize: 14,
});
