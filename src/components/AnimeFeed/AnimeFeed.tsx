/** @jsxImportSource @emotion/react */
import type { FC } from 'react';
import type { SerializedStyles } from '@emotion/react';

import type { Media } from 'lib/types/media';

import { AnimeCard } from '../AnimeCard/AnimeCard';

import * as styles from './AnimeFeedStyle';

type Props = {
  mediaList: Media[]
  withDelete?: boolean;
  onClickDelete?: (media: Media) => void;
  css?: SerializedStyles;
}

export const AnimeFeed: FC<Props> = ({ mediaList, withDelete, onClickDelete, ...props }) => (
  <div css={styles.grid} {...props}>
    {mediaList?.map((media) => (
      <AnimeCard
        key={media.id}
        media={media}
        withDelete={withDelete}
        onClickDelete={() => onClickDelete?.(media)}
      />
    ))}
  </div>
);
