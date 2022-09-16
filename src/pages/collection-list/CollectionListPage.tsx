/** @jsxImportSource @emotion/react */
import { useCallback } from 'react';

import { Button } from 'components/Button/Button';
import { CollectionCard } from 'components/CollectionCard/CollectionCard';
import { CollectionTextInput } from 'components/CollectionTextInput/CollectionTextInput';
import { Modal } from 'components/Modal/Modal';
import { Layout } from 'components/Layout/Layout';

import { useCollectionListPage } from './useCollectionListPage';

import * as styles from './CollectionListPageStyle';

export const CollectionListPage = () => {
  const {
    register,
    isLoading,
    isError,
    formErrors,
    collections,
    selectedCollection,
    isFormOpen,
    isDeleteOpen,
    handleOpenForm,
    handleAttemptSubmit,
    handleSubmitEdit,
    handleCloseForm,
    handleOpenDelete,
    handleCloseDelete,
    handleDelete,
  } = useCollectionListPage();

  const renderEditModal = useCallback(() => {
    const isEdit = !!selectedCollection?.name;
    const label = isEdit ? 'Edit' : 'Add';

    return (
      <Modal
        title={`${label} Collection`}
        primaryButtonText={label}
        onClickPrimaryButton={handleAttemptSubmit(handleSubmitEdit)}
        onClose={handleCloseForm}
      >
        <div css={styles.full}>
          <CollectionTextInput
            placeholder="Collection name"
            register={register}
            error={formErrors?.collectionName}
          />
        </div>
      </Modal>
    );
  }, [formErrors?.collectionName, handleAttemptSubmit, handleCloseForm, handleSubmitEdit, register, selectedCollection?.name]);

  const renderDeleteModal = useCallback(() => (
    <Modal
      title="Delete Collection"
      primaryButtonText="Delete"
      onClickPrimaryButton={handleDelete}
      onClose={handleCloseDelete}
    >
      <p>Are you sure would like to delete this collection?</p>
    </Modal>
  ), [handleCloseDelete, handleDelete]);

  const renderCollections = useCallback(() => {
    if (isLoading) return <p css={styles.center}>Loading ...</p>;

    if (isError || collections?.length === 0) {
      return (
        <p css={styles.center}>
          No collections found
        </p>
      );
    }

    return (
      collections?.map((collection) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          primaryButtonText="Edit"
          secondaryButtonText="Delete"
          onClickPrimaryButton={() => handleOpenForm(collection)}
          onClickSecondaryButton={() => handleOpenDelete(collection)}
        />
      ))
    );
  }, [collections, handleOpenDelete, handleOpenForm, isError, isLoading]);

  const renderHeader = useCallback(() => (
    <div css={styles.header}>
      <h1 css={styles.pageTitle}>Collection List</h1>
      <Button
        onClick={() => handleOpenForm()}
        size="sm"
      >
        + Add New
      </Button>
    </div>
  ), [handleOpenForm]);

  return (
    <Layout>
      {renderHeader()}
      {renderCollections()}
      {isFormOpen && renderEditModal()}
      {isDeleteOpen && renderDeleteModal()}
    </Layout>
  );
};
