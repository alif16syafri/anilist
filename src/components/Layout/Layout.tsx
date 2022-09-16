/** @jsxImportSource @emotion/react */
import { Link } from '@tanstack/react-location';

import type { FC, ReactNode } from 'react';

import * as styles from './LayoutStyle';
import { COLOR } from '../../lib/styles/variables';

type Props = {
  children: ReactNode;
}

const ROUTES = [
  {
    to: '/animes',
    label: 'Anime',
  },
  {
    to: '/collections',
    label: 'Collections',
  },
];

const getActiveProps = () => {
  return {
    style: {
      color: COLOR.B500,
      fontWeight: 600,
    },
  };
};

export const Layout: FC<Props> = ({ children }) => (
  <div css={styles.layout}>
    <header css={styles.header}>
      <Link to="/animes" css={styles.logo}>
        AniList
      </Link>
      {ROUTES.map((route) => (
        <Link
          css={styles.route}
          to={route.to}
          key={route.to}
          getActiveProps={getActiveProps}
        >
          {route.label}
        </Link>
      ))}
    </header>
    <main css={styles.main}>
      {children}
    </main>
  </div>
);
