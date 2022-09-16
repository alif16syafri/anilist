/** @jsxImportSource @emotion/react */
import { UseFormRegister } from 'react-hook-form';

import type { FC } from 'react';

import * as styles from './TextInputStyle';

type InputOwnProps = {
  label?: string;
  register?: UseFormRegister<any>;
  required?: boolean;
  pattern?: RegExp
}

type Props = Omit<JSX.IntrinsicElements['input'], keyof InputOwnProps> & InputOwnProps;

export const TextInput: FC<Props> = ({
  defaultValue,
  placeholder,
  type = 'text',
  label,
  register,
  required = false,
  pattern,
  ...props
}) => (
  <input
    css={styles.textInput}
    type={type}
    placeholder={placeholder}
    defaultValue={defaultValue}
    {...register && label && {
      ...register(label, {
        required,
        pattern,
      }),
    }}
    {...props}
  />
);
