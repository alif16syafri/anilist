/** @jsxImportSource @emotion/react */
import type { FC, ReactNode } from 'react';

import { Button } from '../Button/Button';
import { Portal } from '../Portal/Portal';

import * as styles from './ModalStyle';

type Props = {
  title: string;
  children?: ReactNode;
  primaryButtonText?: string;
  onClickPrimaryButton?: () => void;
  onClose?: () => void;
}

export const Modal: FC<Props> = ({
  title,
  children,
  primaryButtonText,
  onClickPrimaryButton,
  onClose,
}) => {
  return (
    <Portal>
      <div css={styles.container} aria-labelledby="modal-title" role="dialog" aria-modal="true">
        {/* overlay */}
        <div css={styles.overlay} />

        <div css={styles.innerContainer}>
          <div css={styles.modalPosition}>
            <div css={styles.modal}>

              <h3 css={styles.title} id="modal-title">
                {title}
              </h3>

              {children && <div css={styles.body}>{children}</div>}

              <div css={styles.footer}>
                {primaryButtonText && onClickPrimaryButton && (
                  <Button
                    css={styles.primaryBtn}
                    size="sm"
                    data-testid="modal-primary-btn"
                    onClick={onClickPrimaryButton}
                  >
                    {primaryButtonText}
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="secondary"
                  data-testid="modal-secondary-btn"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
