/** @jsxImportSource @emotion/react */
import { Link } from '@tanstack/react-location';

import type { FC, ReactNode } from 'react';

import * as styles from './LayoutStyle';

type Props = {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => (
  <div css={styles.layout}>
    <header css={styles.header}>
      <Link to="/animes" css={styles.logo}>
        AniList
      </Link>
    </header>
    <main css={styles.main}>
      {children}
    </main>
  </div>
);
