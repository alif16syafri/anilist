/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import type { FC, ReactNode } from 'react';
import type { SerializedStyles } from '@emotion/react';

import { COLOR } from 'lib/styles/variables';
import { fp } from 'lib/styles/utils';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'sm' | 'md';

type Props = {
  css?: SerializedStyles;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
}

const buttonStyle = css({
  color: COLOR.N0,
  borderRadius: 4,
  fontWeight: 600,
  minWidth: 80,
  '&:hover': {
    opacity: 0.9,
  },
});

const getVariant = (variant: ButtonVariant) => css({
  background: variant === 'secondary' ? COLOR.N900 : COLOR.B500,
});

const getSize = (size: ButtonSize) => css(fp({
  padding: size === 'sm' ? '4px 16px' : '8px 16px',
  fontSize: size === 'sm' ? [12, 14] : [14, 16],
}));

export const Button: FC<Props> = ({ variant = 'primary', size = 'md',children, onClick, ...props }) => {

  return (
    <button
      type="button"
      onClick={onClick}
      css={[buttonStyle, getVariant(variant), getSize(size)]}
      {...props}
    >
      {children}
    </button>
  );
};
