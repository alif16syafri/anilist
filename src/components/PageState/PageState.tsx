/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Loading } from '../Loading/Loading';

const containerStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 400,
});

export const LoadingState = () => (
  <div css={containerStyle} data-testid="loading">
    <Loading />
  </div>
);

export const NotFoundState = () => (
  <div css={containerStyle} data-testid="empty-state">
    <p>Not found</p>
  </div>
);
