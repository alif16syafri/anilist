/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { UseFormRegister } from 'react-hook-form';

import type { FC } from 'react';
import type { FieldError, LiteralUnion } from 'react-hook-form';

import { COLOR } from 'lib/styles/variables';

import type { CollectionInput } from 'lib/types/collection';

import { TextInput } from '../TextInput/TextInput';

type Props = {
  register?: UseFormRegister<CollectionInput>;
  placeholder?: string;
  error?: FieldError
}

const containerStyle = css({
  width: '100%',
});
const errorStyle = css({
  fontSize: 12,
  color: COLOR.R300,
});

export const COLLECTION_REQUIRED = 'Collection name is required';
export const COLLECTION_ALPHANUMERIC = 'Collection name can only be alphanumeric';

const getError = (type?: LiteralUnion<'pattern' | 'required' | 'custom', string>, message?: string) => {
  if (!type) return message;

  return type === 'pattern' ? COLLECTION_ALPHANUMERIC : COLLECTION_REQUIRED;
};

export const CollectionTextInput: FC<Props> = ({ register, placeholder, error }) => (
  <div css={containerStyle}>
    <TextInput
      placeholder={placeholder}
      id="collectionName"
      label="collectionName"
      register={register}
      required
      pattern={/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/}
    />
    {error && (
      <span css={errorStyle}>
          {getError(error.type, error.message)}
        </span>
    )}
  </div>
);
