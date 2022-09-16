import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import type { FC, ReactNode } from 'react';

type PortalProps = { id?: string, children: ReactNode };

export const Portal: FC<PortalProps> = ({
  id = 'modal-root',
  children,
}) => {
  const modalRootRef = useRef<HTMLElement | null>(null);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    modalRootRef.current = document.getElementById(id);

    if (!modalRootRef.current) {
      modalRootRef.current = document.createElement('div');

      modalRootRef.current.setAttribute('id', id);
      document.body.appendChild(modalRootRef.current);
    }

    setMounted(true);
  }, [id]);

  return isMounted && modalRootRef.current
    ? createPortal(children, modalRootRef.current)
    : null;
};
