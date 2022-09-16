/** @jsxImportSource @emotion/react */
import { useState } from 'react';

import type { FC } from 'react';
import type { SerializedStyles } from '@emotion/react';

import * as styles from './ImageStyle';

import NoImage from './no_image.png';

export type ImageVariant = 'square' | 'rectangle';

type Props = {
  src: string;
  alt?: string;
  variant?: ImageVariant;
  css?: SerializedStyles;
}

export const Image: FC<Props> = ({ src, alt = '', variant = 'rectangle', ...props }) => {
  const [isError, setIsError] = useState(false);

  return isError ? (
    <div css={[styles.imageContainer, styles.getVariant(variant)]} {...props}>
      <div css={styles.image}>
        <img src={NoImage} width={24} alt="broken" />
      </div>
    </div>
  ) : (
    <div css={[styles.imageContainer, styles.getVariant(variant)]} {...props}>
      <img
        css={styles.image}
        src={src}
        alt={alt}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          setIsError(true);
        }}
      />
    </div>
  );
};
