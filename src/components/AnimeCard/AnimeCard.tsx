/** @jsxImportSource @emotion/react */
import { Link } from '@tanstack/react-location';

import type { FC } from 'react';
import type { SerializedStyles } from '@emotion/react';

import type { Media } from 'lib/types/media';

import { Image } from '../Image/Image';

import * as styles from './AnimeCardStyle';

type Props = {
  media: Media;
  withTitle?: boolean;
  withDelete?: boolean;
  onClickDelete?: () => void;
  css?: SerializedStyles;
}

export const AnimeCard: FC<Props> = ({
  media,
  withTitle = true,
  withDelete,
  onClickDelete,
  ...props
}) => (
  <div {...props}>
    <Link to={`/anime/${media.id}`}>
      <Image src={media.coverImage.large} />
      {withTitle && <p css={styles.title}>{media.title.userPreferred}</p>}
    </Link>
    {withDelete && onClickDelete && (
      <p css={styles.actionDelete} onClick={onClickDelete}>
        Delete
      </p>
    )}
  </div>
);
