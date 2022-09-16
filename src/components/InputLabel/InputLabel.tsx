/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import type { FC, ReactNode } from 'react';

import { COLOR } from 'lib/styles/variables';

type LabelOwnProps = {
  children?: ReactNode;
}

type Props = Omit<JSX.IntrinsicElements['label'], keyof LabelOwnProps> & LabelOwnProps;

export const labelStyle = css({
  color: COLOR.N200,
  fontSize: 12,
});

export const InputLabel: FC<Props> = ({ children, ...props }) => (
  <label css={labelStyle} {...props}>{children}</label>
);
