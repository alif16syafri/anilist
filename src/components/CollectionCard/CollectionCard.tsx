/** @jsxImportSource @emotion/react */
import { Link } from '@tanstack/react-location';

import type { FC } from 'react';

import type { Collection } from 'lib/types/collection';

import { Image } from '../Image/Image';

import * as styles from './CollectionCardStyle';

type Props = {
  collection: Collection;
  withDivider?: boolean;
  primaryButtonText: string;
  secondaryButtonText?: string;
  onClickPrimaryButton: () => void;
  onClickSecondaryButton?: () => void;
}

export const CollectionCard: FC<Props> = ({
  collection,
  withDivider = true,
  primaryButtonText,
  secondaryButtonText,
  onClickPrimaryButton,
  onClickSecondaryButton,
}) => {
  const image = collection?.media[0]?.coverImage.large ?? '';

  return (
    <>
      <div css={styles.collection}>

        <Link to={`/collection/${collection.id}`}>
          <div css={styles.leftPanel}>
            <div css={styles.image}>
              <Image src={image} variant="square" />
            </div>
            <div>
              <p css={styles.name}>{collection.name}</p>
              <p css={styles.totalCollections}>
                {`${collection.media.length} collections`}
              </p>
            </div>
          </div>
        </Link>

        <div css={styles.action}>
          <p
            css={styles.actionEdit}
            onClick={onClickPrimaryButton}
          >
            {primaryButtonText}
          </p>
          {secondaryButtonText && onClickSecondaryButton && (
            <>
              <span css={styles.actionSeparator}>|</span>
              <p
                css={styles.actionDelete}
                onClick={onClickSecondaryButton}
              >
                {secondaryButtonText}
              </p>
            </>
          )}
        </div>
      </div>
      {withDivider && <div css={styles.divider} />}
    </>
  );
};
